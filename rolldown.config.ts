import { defineConfig } from 'rolldown'
import vue from '@vitejs/plugin-vue'

import pkg from './package.json'

export default defineConfig([
  {
    input: 'src/components/index.ts',
    output: {
      format: 'esm',
      file: pkg.module
    },
    plugins: [
      vue() as any
    ],
  }
]);
