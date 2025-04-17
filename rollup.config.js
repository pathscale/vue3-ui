import vue from '@vitejs/plugin-vue'
import styles from 'rollup-plugin-styles'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-ts'
import externals from 'rollup-plugin-node-externals'

import pkg from './package.json'

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
      vue(),
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
      vue(),
      ts(),
      // Vue plugin won't handle CSS currently
      styles(),
    ],
  },
]
