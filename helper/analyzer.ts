import path from 'path'
import fs from 'fs-extra'
import { sync as resolveSync } from 'resolve'
import * as jsparser from '@babel/parser'
import traverse from '@babel/traverse'
import * as htmlparser from 'htmlparser2'
import getDynamicClasses from './get-dynamic-classes'
import { normalizePath } from './utils'
import { parseSFC, isVueSFC } from './analyzer-utils'

export function getWhitelist(input: string): string[] {
  const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.vue', '.json']

  const isSupported = (id: string) => {
    const lowerId = normalizePath(id.toLowerCase())
    if (lowerId.includes('/node_modules/')) return false
    return extensions.some(ext => lowerId.endsWith(ext))
  }

  const whitelist = new Set<string>()
  const traversed = new Set<string>()
  const idList = [normalizePath(path.resolve(input))]

  const parser = new htmlparser.Parser(
    {
      onopentagname(name) {
        whitelist.add(name)
      },

      onattribute(name, data) {
        if (name === 'class') {
          for (const c of data.split(' ')) whitelist.add(c)
          return
        }

        if (name === ':class') {
          const classes = getDynamicClasses(data)
          for (const c of classes) whitelist.add(c)
          return
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
    return
  }

  function resolveSource(id: string, value: string): string | undefined {
    const depId = normalizePath(
      resolveSync(value, {
        basedir: path.dirname(id),
        extensions,
        packageFilter(pkg) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          if (pkg.module) pkg.main = pkg.module
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return pkg
        },
      }),
    )

    if (traversed.has(depId) || !isSupported(depId)) return
    else traversed.add(depId)
    return depId
  }

  function traverseSource(id: string, rawCode: string) {
    const code = extract(rawCode, id)
    if (!code) return

    const ast = jsparser.parse(code, { sourceType: 'unambiguous' })
    traverse(ast, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      StringLiteral({ node }) {
        if (!isVueSFC(id)) return
        for (const cl of node.value.split(' ')) whitelist.add(cl)
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportNamedDeclaration({ node }) {
        if (!node.source) return
        const depId = resolveSource(id, node.source.value)
        if (depId) idList.push(depId)
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration({ node }) {
        const depId = resolveSource(id, node.source.value)
        if (depId) idList.push(depId)
      },
    })
  }

  while (idList.length > 0) {
    const id = idList.pop()
    if (!id) continue
    const code = fs.readFileSync(id, 'utf8')
    traverseSource(id, code)
  }

  const wl = [...whitelist]
    // Delete some garbage
    .filter(_v => {
      const v = _v.trim()
      const garbage = ['vue', 'slot']
      if (!v) return false
      if (/[A-Z]/.test(v)) return false
      if (/[\.\\\/]/.test(v)) return false
      if (garbage.includes(v)) return false
      return true
    })
    .sort()

  return wl
}
