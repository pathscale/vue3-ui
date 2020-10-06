'use strict'

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'ash-nazg/sauron',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['vue'],
  overrides: [
    {
      files: [
        '.eslintrc.js',
        'postcss.config.js',
        'webpack.config.js',
        '.3rdparty-eslintrc.js',
        '.np-config.js',
      ],
      extends: [
        'ash-nazg/sauron-node',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
      ],
      env: {
        node: true,
      },
      globals: {
        // Have to add these back due to config inheritance
        __dirname: true,
        module: true,
        require: true,
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'script',
      },
      rules: {
        strict: ['error', 'global'],
        'import/no-commonjs': 'off',

        // Disabling for now
        'require-unicode-regexp': 'off',
        'prefer-named-capture-group': 'off',
      },
    },
    {
      files: '*.ts',
      extends: ['plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      rules: {
        // Reenable later?
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
    {
      files: 'src/shims-vue.d.ts',
      rules: {
        // No imports/exports in plain declaration file
        'import/unambiguous': 'off',
      },
    },
    {
      files: '*.vue',
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportNamespaceSpecifier',
        message:
          'As it is wasteful to use all named imports, use only those ' +
          'which are needed (or switch to a default import).',
      },
    ],

    // Disabling for now
    'import/extensions': 'off',
    'jsdoc/require-jsdoc': 'off',
    'require-unicode-regexp': 'off',
    'prefer-named-capture-group': 'off',

    // Keep this here so can uncomment to check inline disabling
    // "eslint-comments/no-use": "error",

    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
  },
}
