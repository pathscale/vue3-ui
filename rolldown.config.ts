import { defineConfig } from 'rolldown'
import vue from '@pathscale/rollup-plugin-vue3'
import url from '@rollup/plugin-url'
import styles from 'rollup-plugin-styles'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-ts'
import externals from 'rollup-plugin-node-externals'

export default defineConfig([
  {
    input: 'src/components/index.js',
    external: ['vue'],
    output: {
      file: 'dist/bundle.js',
    },
    plugins: [
      externals({ deps: true }),
      resolve({ extensions: ['.vue', '.js', '.css'] }),
      vue({ template: { isProduction: true }, preprocessStyles: false }),
      ts(),
      styles({ mode: ['extract', 'bundle.css'], url: { inline: true } }),
      url({ include: ['**/*.svg'] }),
    ],
  },
  {
    input: 'src/components/index.js',
    external: ['vue'],
    output: {
      file: 'dist/bundle-browser.js',
    },
    plugins: [
      resolve({ extensions: ['.vue', '.js'] }),
      vue({ template: { isProduction: false }, preprocessStyles: false }),
      ts(),
      // Vue plugin won't handle CSS currently
      styles(),
      // Not defined in browser
      // eslint-disable-next-line node/no-process-env -- Used for build
      replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
      url({ include: ['**/*.svg'] }),
    ],
  },
])
