import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'
import pkg from './package.json'

export default defineConfig({
  tools: {
    htmlPlugin: false,
  },
  plugins: [pluginNodePolyfill(), pluginVue()],
  output: {
    filenameHash: false,
    distPath: {
      js: '',
      css: '',
    },
  },
  environments: {
    web: {
      resolve: {
        extensions: ['.vue', '.js', '.css'],
      },
      source: {
        entry: {
          index: './src/components/index.js',
        },
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
      },
      output: {
        target: 'web',
        filename: {
          js: pkg.browser,
          css: pkg.style,
        },
        externals: ['vue'],
      },
    },
    node: {
      plugins: [pluginVue()],
      resolve: {
        extensions: ['.vue', '.js'],
      },
      source: {
        entry: {
          index: './src/components/index.js',
        },
      },
      output: {
        target: 'node',
        filename: {
          js: pkg.module,
        },
      },
    },
  },
})
