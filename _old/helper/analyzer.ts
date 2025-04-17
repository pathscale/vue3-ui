import path from 'path'
import assert from 'assert'
import fs from 'fs-extra'
import { sync as resolveSync } from 'resolve'
import { parse as jsparserParse } from '@babel/parser'
import traverse from '@babel/traverse'
import { Parser as HtmlparserParser } from 'htmlparser2'
import getDynamicClasses from './get-dynamic-classes'
import { normalizePath } from './utils'
import { parseSFC, isVueSFC } from './analyzer-utils'
import { transitions } from './data'
import { parserOpts } from './config'

export function getWhitelist(
  input: string,
  name: string,
): { always: string[]; optional: string[]; unstable: string[] } {
  const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.vue', '.json']

  const animationSuffixes = [
    '-enter',
    '-enter-active',
    '-enter-to',
    '-leave',
    '-leave-active',
    '-leave-to',
  ]

  const isSupported = (id: string): boolean => {
    const lowerId = normalizePath(id.toLowerCase())
    if (lowerId.includes('/node_modules/')) return false
    return extensions.some(ext => lowerId.endsWith(ext))
  }

  const always = new Set<string>()
  const optional = new Set<string>()
  const unstable = new Set<string>()

  const traversed = new Set<string>()
  const idList = [normalizePath(path.resolve(input))]
  // const animationList: string[] = []

  const parser = new HtmlparserParser(
    {
      onopentag(name, attrs): void {
        // always.add(name)

        if (name === 'transition') {
          for (const transition of transitions) {
            for (const suffix of animationSuffixes) always.add(transition + suffix)
          }

          if (attrs.name) for (const suffix of animationSuffixes) always.add(attrs.name + suffix)
          // if (attrs[':name']) animationList.push(attrs[':name'])
        }
      },

      onattribute(name, data): void {
        if (name === 'class') {
          for (const c of data.split(' ')) always.add(c)
          return
        }

        if (name === ':class') {
          const classes = getDynamicClasses(data)
          for (const c of classes.optional) {
            if (c.startsWith('is-')) optional.add(c)
            else always.add(c)
          }

          for (const c of classes.unstable) {
            unstable.add(c)
          }
        }
      },
    },
    { decodeEntities: true, lowerCaseTags: false, lowerCaseAttributeNames: true },
  )

  function extract(code: string, id: string): string | undefined {
    if (!isVueSFC(id)) return code
    const { template, script } = parseSFC(code, id)
    if (template?.content) parser.parseComplete(template.content)
    if (script?.content) return script.content
    return undefined
  }

  function resolveSource(id: string, value: string): string | undefined {
    const depId = normalizePath(
      resolveSync(value, {
        basedir: path.dirname(id),
        extensions,
        packageFilter(pkg) {
          if (pkg.module) pkg.main = pkg.module
          return pkg
        },
      }),
    )

    if (traversed.has(depId) || !isSupported(depId)) return undefined
    traversed.add(depId)
    return depId
  }

  function traverseSource(id: string, rawCode: string): void {
    const code = extract(rawCode, id)
    if (!code) return

    const ast = jsparserParse(code, parserOpts)
    traverse(ast, {
      /* eslint-disable @typescript-eslint/naming-convention -- AST */
      StringLiteral({ node }) {
        if (!isVueSFC(id)) return
        for (const cl of node.value.split(' ')) {
          always.add(cl)
        }
      },

      ExportNamedDeclaration({ node }) {
        if (!node.source) return
        const depId = resolveSource(id, node.source.value)
        if (depId) idList.push(depId)
      },

      ImportDeclaration({ node }) {
        const depId = resolveSource(id, node.source.value)
        if (depId) idList.push(depId)
      },
      /* eslint-enable @typescript-eslint/naming-convention -- AST */
    })
  }

  while (idList.length > 0) {
    const id = idList.pop()
    if (!id) continue
    const code = fs.readFileSync(id, 'utf8')
    traverseSource(id, code)
  }

  const clean = (list: string[]): string[] =>
    // Delete some garbage
    list
      .filter(_v => {
        const v = _v.trim()
        const garbage = ['vue', 'slot']
        if (!v) return false
        if (/[A-Z]/.test(v)) return false
        if (/[./:\\]/.test(v)) return false
        if (garbage.includes(v)) return false
        return true
      })
      .sort()

  // make sure the unstable variables have their dependencies documented
  const documentedClasses: Record<string, string[]> =
    JSON.parse(fs.readFileSync('helper/classes.json', 'utf-8'))[name] ?? {}

  unstable.forEach((cl: string) =>
    assert(cl in documentedClasses, `${cl} not documented in helper/classes.json for ${name}`),
  )

  return {
    always: clean([...always]),
    optional: clean([...optional]),
    unstable: clean([...unstable]),
  }
}
