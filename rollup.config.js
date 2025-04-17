import vue from '@vitejs/plugin-vue'
import styles from 'rollup-plugin-styles'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import ts from 'rollup-plugin-ts'
import externals from 'rollup-plugin-node-externals'
import path from 'path'

import pkg from './package.json'

export default [
  {
    input: 'src/components/index.js',
    external: ['vue'],
    output: { format: 'es', file: pkg.module, assetFileNames: '[name][extname]' },
    plugins: [
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
      }),
      externals({ deps: true }),
      resolve({ extensions: ['.vue', '.js', '.css'] }),
      vue(),
      ts(),
      styles({ mode: ['extract', 'bundle.css'], url: { inline: true } }),
    ],
  },
  {
    input: 'src/components/index.js',
    output: { format: 'es', file: pkg.browser, assetFileNames: '[name][extname]' },
    plugins: [
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
      }),
      resolve({ extensions: ['.vue', '.js'] }),
      vue(),
      ts(),
      // Vue plugin won't handle CSS currently
      styles(),
      // Not defined in browser
      replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    ],
  },
]
