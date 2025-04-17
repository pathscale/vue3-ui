import vue from '@pathscale/rollup-plugin-vue3'
import styles from 'rollup-plugin-styles'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-ts'
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
      replace({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
        preventAssignment: true,
      }),
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
      // Not defined in browser
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
        preventAssignment: true,
      }),
      resolve({ extensions: ['.vue', '.js'] }),
      vue({ template: { isProduction: false }, preprocessStyles: false }),
      ts(),
      // Vue plugin won't handle CSS currently
      styles(),
    ],
  },
]
