'use strict'

// Non-TS base
const baseConfigs = [
  'ash-nazg/sauron',
  'plugin:vue/vue3-recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:prettier/recommended',
]

// TS base
const baseTSConfigs = [
  ...baseConfigs,
  'plugin:import/typescript',
  'plugin:@typescript-eslint/recommended',
]

// Todo: Remove this in favor of `baseTSConfigs` when TS working in Vue files
const baseConfigsNoTS = baseTSConfigs.filter(c => !c.includes('@typescript-eslint'))

// Node-specific base configs
const baseNodeConfigs = [
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:prettier/recommended',
]

// `eslint-plugin-vue` rules
const vueRules = {
  // Disabling as Vue linter won't catch (and we are requiring `name` anyways)
  'import/no-anonymous-default-export': 'off',

  // Temporarily disable
  'vue/no-boolean-default': 'off', // Enable?
  'vue/no-mutating-props': 'off', // Enable?
  'vue/require-default-prop': 'off', // Enable?
  // 'vue/no-duplicate-attr-inheritance': ['error'], // Enforce?
  // 'vue/no-static-inline-styles': ['error'], // Use later; require in <style>

  'vue/no-unused-properties': [
    'error',
    {
      // 'data', 'methods'
      groups: ['props', 'computed', 'setup'],
    },
  ],

  // 'vue/no-bare-strings-in-template': ['error'], // Use later if i18nizing
  // 'vue/html-comment-indent': ['error'], // Possibly too oppressive

  // Disable
  'vue/attributes-order': 'off', // Oppressive
  'vue/max-attributes-per-line': 'off', // A bit oppressive

  'vue/block-tag-newline': ['error'],
  'vue/component-name-in-template-casing': ['error', 'kebab-case'],
  'vue/html-comment-content-newline': ['error'],
  'vue/html-comment-content-spacing': ['error'],
  'vue/match-component-file-name': ['error', { shouldMatchCase: true }],
  // 'vue/no-boolean-default': ['error'],
  'vue/no-empty-component-block': ['error'],
  'vue/no-multiple-objects-in-class': ['error'],
  'vue/no-potential-component-option-typo': ['error', { presets: ['vue', 'vue-router'] }],
  'vue/no-reserved-component-names': ['error'],
  'vue/no-restricted-component-options': ['error', 'data', 'computed', 'methods', 'watch'],
  'vue/no-template-target-blank': ['error', { allowReferrer: true }],
  'vue/no-unregistered-components': [
    'error',
    {
      // Component used in main.ts
      ignorePatterns: ['router-view'],
    },
  ],
  'vue/no-unsupported-features': ['error', { version: '^3.0.0' }],
  'vue/no-useless-mustaches': ['error'],
  'vue/no-useless-v-bind': ['error'],
  'vue/padding-line-between-blocks': ['error'],
  'vue/require-direct-export': ['error'],
  'vue/require-name-property': ['error'],
  'vue/v-for-delimiter-style': ['error'],
  'vue/v-on-function-call': ['error'],
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
}

const baseRules = {
  // Keep this here so can uncomment to check inline disabling
  // "eslint-comments/no-use": "error",

  // Simplifying
  'import/extensions': 'off',

  // Disabling for now
  'max-len': 'off', // ['warn', { code: 80 }],
  'jsdoc/require-jsdoc': 'off',
  'require-unicode-regexp': 'off',
  'prefer-named-capture-group': 'off',

  // More consistent styling of WS before exports
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: ['const', 'let'], next: 'export' },
  ],

  // Wasteful to use all named imports
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ImportNamespaceSpecifier',
      message:
        'As it is wasteful to use all named imports, use only those ' +
        'which are needed (or switch to a default import).',
    },
  ],
}

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: baseConfigs,
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    // Node.js config files (non-Vue, non-TS)
    {
      files: ['.*.js', '*.config.js'],
      extends: baseNodeConfigs,
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
        ecmaVersion: 'latest',
        sourceType: 'script',
      },
      rules: {
        ...baseRules,

        // CommonJS:
        strict: ['error', 'global'],
        'import/no-commonjs': 'off',
      },
    },
    // Rollup (ESM)
    {
      files: 'rollup.config.js',
      env: {
        node: true,
      },
      globals: {
        __dirname: true, // Switch to `import.meta.url` when using bona fide ESM
      },
      extends: baseNodeConfigs,
      rules: {
        ...baseRules,
      },
    },
    // TS files
    {
      files: '*.ts',
      extends: baseTSConfigs,
      rules: {
        ...baseRules,

        // Possible non-recommended items to enable?
        // '@typescript-eslint/no-unsafe-assignment': ['error'],
        // '@typescript-eslint/no-unsafe-member-access': ['error'],
        // '@typescript-eslint/no-unsafe-return': ['error'],
        '@typescript-eslint/naming-convention': ['error'],
      },
    },
    // TS declaration files
    {
      files: '*.d.ts',
      extends: baseTSConfigs,
      rules: {
        ...baseRules,
        // Let API be as needed
        '@typescript-eslint/naming-convention': 'off',
        // No imports/exports in plain declaration file
        'import/unambiguous': 'off',
      },
    },
    // Vue SFC files
    {
      files: '*.vue',
      extends: baseConfigsNoTS,
      // Need `vue` `parser` and `plugins` re-added since adding `vue3`
      parser: require.resolve('vue-eslint-parser'),
      plugins: ['vue', '@pathscale/vue3'],
      rules: {
        ...baseRules,
        ...vueRules,

        '@pathscale/vue3/v-directive': [
          'error',
          {
            unsafe: [
              // These just add a single operator
              // 'SpreadElement',
              // 'UnaryExpression',

              // This seems unavoidable
              // 'CallExpression',

              // To avoid these, one can use a call expression
              'AssignmentExpression',
              'BinaryExpression',
              'LogicalExpression',
              'ConditionalExpression',
              // This can have design features but preventing to avoid ugliness
              'TemplateLiteral[expressions.length <= 1]',
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    ...baseRules,
  },
}
