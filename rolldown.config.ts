import { defineConfig } from 'rolldown';

import pkg from './package.json'

export default defineConfig([
  {
    input: 'src/components/index.ts',
    output: {
      format: 'esm',
      file: pkg.module
    },
  }
]);
