import { defineConfig } from 'rolldown';

export default defineConfig([
  {
    input: 'src/main.js',
    output: {
      format: 'esm',
      file: 'bundle.js',
    },
  }
]);
