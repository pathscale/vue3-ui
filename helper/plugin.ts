import { createFilter } from '@rollup/pluginutils'
import { Plugin } from 'rollup'
import { parseQuery } from './utils'
import * as htmlparser2 from 'htmlparser2'
import getDynamicClasses from './get-dynamic-classes'

export default function (): Plugin {
  const whitelist = new Set<string>()
  const filter = createFilter(null, ['**/node_modules/**'])

  const parser = new htmlparser2.Parser(
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

  const plugin: Plugin = {
    name: 'gatherer',

    transform(code, id) {
      const query = parseQuery(id)
      if (!query.vue) return null
      if (!query.src && !filter(query.filename)) return null
      if (query.type !== 'template') return null
      parser.parseComplete(code)
      return null
    },

    generateBundle() {
      const source = JSON.stringify([...whitelist].sort())
      this.emitFile({ type: 'asset', fileName: 'whitelist', source })
    },
  }

  return plugin
}
