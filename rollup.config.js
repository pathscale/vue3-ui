import vue from 'rollup-plugin-vue'
import styles from 'rollup-plugin-styles'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

// eslint-disable-next-line import/no-anonymous-default-export -- Used internally by Rollup
export default [
  {
    input: 'src/components/index.js',
    external: ['vue'],
    output: {
      format: 'esm',
      file: 'dist/bundle.js',
      assetFileNames: `[name][extname]`,
    },
    plugins: [
      resolve({ extensions: ['.vue', '.js', '.css'] }),
      vue({ template: { isProduction: true } }),
      styles({ mode: ['extract', 'bundle.css'], url: { inline: true } }),
    ],
  },
  {
    input: 'src/components/index.js',
    output: {
      format: 'esm',
      file: 'dist/bundle-browser.js',
      assetFileNames: `[name][extname]`,
    },
    plugins: [
      resolve({ extensions: ['.vue', '.js'] }),
      vue({ template: { isProduction: false } }),
      // Vue plugin won't handle CSS currently
      styles(),
      // Not defined in browser
      replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    ],
  },
]
