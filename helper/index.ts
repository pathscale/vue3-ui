import path from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'

import { rollup, OutputAsset } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import styles from 'rollup-plugin-styles'
import gatherer from './plugin'

// TODO: Migrate helper to @babel/parser approach
async function getWhitelist(file: string): Promise<string[]> {
  const bundle = await rollup({
    input: file,
    plugins: [resolve({ preferBuiltins: true }), gatherer(), vue(), styles()],
  })
  const { output } = await bundle.generate({})
  const whitelistFile = output.find(f => f.fileName === 'whitelist') as OutputAsset
  const whitelist = JSON.parse(Buffer.from(whitelistFile.source).toString('utf8')) as string[]
  return whitelist
}

async function main(): Promise<void> {
  const mappings: Record<string, string[]> = {}

  const pattern = path.resolve(__dirname, '..', 'src', '**', '*.vue').replace(/\\/g, '/')
  const vueFiles = (await fg(pattern)).sort() as string[]

  for await (const file of vueFiles) {
    if (path.parse(file).name === 'App') continue
    const whitelist = await getWhitelist(file)
    mappings[path.parse(file).name] = whitelist
  }

  fs.writeFileSync(path.join(__dirname, 'mappings.json'), JSON.stringify(mappings, null, '  '))
}

void main()
