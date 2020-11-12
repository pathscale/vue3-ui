import vue from 'rollup-plugin-vue'
import styles from 'rollup-plugin-styles'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import ts from '@wessberg/rollup-plugin-ts'
import externals from 'rollup-plugin-node-externals'

import pkg from './package.json'

// eslint-disable-next-line import/no-anonymous-default-export -- Used internally by Rollup
export default [
  {
    input: 'src/components/index.js',
    external: ['vue'],
    output: { format: 'es', file: pkg.module, assetFileNames: '[name][extname]' },
    plugins: [
      externals({ deps: true }),
      resolve({ extensions: ['.vue', '.js', '.css'] }),
      vue({ template: { isProduction: true }, preprocessStyles: false }),
      ts(),
      styles({ mode: ['extract', 'bundle.css'], url: { inline: true } }),
    ],
  },
  {
    input: 'src/components/index.js',
    output: { format: 'es', file: pkg.browser, assetFileNames: '[name][extname]' },
    plugins: [
      resolve({ extensions: ['.vue', '.js'] }),
      vue({ template: { isProduction: false }, preprocessStyles: false }),
      ts(),
      // Vue plugin won't handle CSS currently
      styles(),
      // Not defined in browser
      // eslint-disable-next-line node/no-process-env -- Used for build
      replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    ],
  },
]
