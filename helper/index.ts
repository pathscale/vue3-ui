import path from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { parse as jsparserParse } from '@babel/parser'
import traverse from '@babel/traverse'
import { getWhitelist } from './analyzer'
import { normalizePath } from './utils'
import { isVueSFC } from './analyzer-utils'
import { parserOpts } from './config'

const srcDir = path.resolve(__dirname, '..', 'src')

async function main(): Promise<void> {
  const namesMap: Record<string, string> = {}
  const inputFile = normalizePath(srcDir, 'components', 'index.js')
  const inputCode = fs.readFileSync(inputFile, 'utf-8')

  const ast = jsparserParse(inputCode, parserOpts)
  traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- AST
    ExportNamedDeclaration({ node }) {
      if (!node.source) return
      const { value } = node.source
      if (!isVueSFC(value)) return
      for (const spec of node.specifiers) {
        if (spec.type !== 'ExportSpecifier') continue
        if (spec.local.name !== 'default') continue
        if ('name' in spec.exported) namesMap[path.parse(value).name] = spec.exported.name
      }
    },
  })

  const mappings: Record<string, { always?: string[]; optional?: string[] }> = {}
  const pattern = normalizePath(srcDir, '**', '*.vue')
  const files = ((await fg(pattern)) as string[]).sort()

  for await (const file of files) {
    const name = namesMap[path.parse(file).name]
    if (!name) continue
    mappings[name] = getWhitelist(file, name)
  }

  fs.writeFileSync(path.join(__dirname, 'mappings.json'), JSON.stringify(mappings, null, '  '))
}

main()
