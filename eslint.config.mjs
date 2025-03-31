import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'

import globals from "globals";
import vue from "eslint-plugin-vue";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});
import parser from "/Users/vdugintsov/www/pathscale/github/vue3-ui/node_modules/vue-eslint-parser/index.js";

export default defineConfig([{
    ignores: ["dist"],
    extends: fixupConfigRules(compat.extends(
        "plugin:vue/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
    )),

    languageOptions: {
        globals: {
            ...globals.browser,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        ecmaVersion: 'latest',
        sourceType: "script",
    },

    rules: {
        "import/extensions": "off",
        "max-len": "off",
        "jsdoc/require-jsdoc": "off",
        "require-unicode-regexp": "off",
        "prefer-named-capture-group": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let"],
            next: "export",
        }],

        "no-restricted-syntax": ["error", {
            selector: "ImportNamespaceSpecifier",
            message: "As it is wasteful to use all named imports, use only those which are needed (or switch to a default import).",
        }],
    },
}, {
    files: ["**/.*.js", "**/*.config.js"],

    extends: fixupConfigRules(compat.extends(
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
    )),

    languageOptions: {
        globals: {
            ...globals.node,
            __dirname: true,
            module: true,
            require: true,
        },

        ecmaVersion: 'latest',
        sourceType: "commonjs",
    },

    rules: {
        "import/extensions": "off",
        "max-len": "off",
        "jsdoc/require-jsdoc": "off",
        "require-unicode-regexp": "off",
        "prefer-named-capture-group": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let"],
            next: "export",
        }],

        "no-restricted-syntax": ["error", {
            selector: "ImportNamespaceSpecifier",
            message: "As it is wasteful to use all named imports, use only those which are needed (or switch to a default import).",
        }],

        strict: ["error", "global"],
        "import/no-commonjs": "off",
    },
}, {
    files: ["**/rollup.config.js"],

    extends: fixupConfigRules(compat.extends(
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
    )),

    languageOptions: {
        globals: {
            ...globals.node,
            __dirname: true,
        },
    },

    rules: {
        "import/extensions": "off",
        "max-len": "off",
        "jsdoc/require-jsdoc": "off",
        "require-unicode-regexp": "off",
        "prefer-named-capture-group": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let"],
            next: "export",
        }],

        "no-restricted-syntax": ["error", {
            selector: "ImportNamespaceSpecifier",
            message: "As it is wasteful to use all named imports, use only those which are needed (or switch to a default import).",
        }],
    },
}, {
    files: ["**/*.ts"],

    extends: fixupConfigRules(compat.extends(
        "plugin:vue/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
    )),

    rules: {
        "import/extensions": "off",
        "max-len": "off",
        "jsdoc/require-jsdoc": "off",
        "require-unicode-regexp": "off",
        "prefer-named-capture-group": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let"],
            next: "export",
        }],

        "no-restricted-syntax": ["error", {
            selector: "ImportNamespaceSpecifier",
            message: "As it is wasteful to use all named imports, use only those which are needed (or switch to a default import).",
        }],

        "@typescript-eslint/naming-convention": ["error"],
    },
}, {
    files: ["**/*.d.ts"],

    extends: fixupConfigRules(compat.extends(
        "plugin:vue/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
    )),

    rules: {
        "import/extensions": "off",
        "max-len": "off",
        "jsdoc/require-jsdoc": "off",
        "require-unicode-regexp": "off",
        "prefer-named-capture-group": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let"],
            next: "export",
        }],

        "no-restricted-syntax": ["error", {
            selector: "ImportNamespaceSpecifier",
            message: "As it is wasteful to use all named imports, use only those which are needed (or switch to a default import).",
        }],

        "@typescript-eslint/naming-convention": "off",
        "import/unambiguous": "off",
    },
}, {
    files: ["**/*.vue"],

    extends: fixupConfigRules(compat.extends(
        "plugin:vue/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
        "plugin:import/typescript",
    )),

    plugins: {
        vue: fixupPluginRules(vue),
    },

    languageOptions: {
        parser,
    },

    rules: {
        "import/extensions": "off",
        "max-len": "off",
        "jsdoc/require-jsdoc": "off",
        "require-unicode-regexp": "off",
        "prefer-named-capture-group": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let"],
            next: "export",
        }],

        "no-restricted-syntax": ["error", {
            selector: "ImportNamespaceSpecifier",
            message: "As it is wasteful to use all named imports, use only those which are needed (or switch to a default import).",
        }],

        "import/no-anonymous-default-export": "off",
        "vue/no-boolean-default": "off",
        "vue/no-mutating-props": "off",
        "vue/require-default-prop": "off",
        "vue/multi-word-component-names": "off",

        "vue/no-unused-properties": ["error"],

        "vue/attributes-order": "off",
        "vue/max-attributes-per-line": "off",
        "vue/block-tag-newline": ["error"],
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/html-comment-content-newline": ["error"],
        "vue/html-comment-content-spacing": ["error"],

        "vue/match-component-file-name": ["error", {
            shouldMatchCase: true,
        }],

        "vue/no-empty-component-block": ["error"],
        "vue/no-multiple-objects-in-class": ["error"],

        "vue/no-potential-component-option-typo": ["error", {
            presets: ["vue", "vue-router"],
        }],

        "vue/no-reserved-component-names": ["error"],
        "vue/no-restricted-component-options": ["error", "data", "computed", "methods", "watch"],

        "vue/no-template-target-blank": ["error", {
            allowReferrer: true,
        }],

        "vue/no-unsupported-features": ["error", {
            version: "^3.0.0",
        }],

        "vue/no-useless-mustaches": ["error"],
        "vue/no-useless-v-bind": ["error"],
        "vue/padding-line-between-blocks": ["error"],
        "vue/require-direct-export": ["error"],
        "vue/require-name-property": ["error"],
        "vue/v-for-delimiter-style": ["error"],

        "vue/html-closing-bracket-newline": ["error", {
            singleline: "never",
            multiline: "never",
        }],

        "vue/html-self-closing": ["error", {
            html: {
                void: "always",
            },
        }],
    },
}, {
    files: ["**/components/**/*.js"],

    extends: fixupConfigRules(compat.extends(
      "plugin:vue/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:prettier/recommended",
      "plugin:import/typescript",
    )),

    plugins: {
        vue: fixupPluginRules(vue),
    },

    languageOptions: {
        parser,
        sourceType: "module",
    },

    rules: {
        "import/extensions": "off",
        "max-len": "off",
        "jsdoc/require-jsdoc": "off",
        "require-unicode-regexp": "off",
        "prefer-named-capture-group": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "always",
            prev: ["const", "let"],
            next: "export",
        }],

        "no-restricted-syntax": ["error", {
            selector: "ImportNamespaceSpecifier",
            message: "As it is wasteful to use all named imports, use only those which are needed (or switch to a default import).",
        }],

        "import/no-anonymous-default-export": "off",
        "vue/no-boolean-default": "off",
        "vue/no-mutating-props": "off",
        "vue/require-default-prop": "off",

        "vue/no-unused-properties": ["error"],

        "vue/attributes-order": "off",
        "vue/max-attributes-per-line": "off",
        "vue/block-tag-newline": ["error"],
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/html-comment-content-newline": ["error"],
        "vue/html-comment-content-spacing": ["error"],

        "vue/match-component-file-name": ["error", {
            shouldMatchCase: true,
        }],

        "vue/no-empty-component-block": ["error"],
        "vue/no-multiple-objects-in-class": ["error"],

        "vue/no-potential-component-option-typo": ["error", {
            presets: ["vue", "vue-router"],
        }],

        "vue/no-reserved-component-names": ["error"],
        "vue/no-restricted-component-options": ["error", "data", "computed", "methods", "watch"],

        "vue/no-template-target-blank": ["error", {
            allowReferrer: true,
        }],

        "vue/no-unsupported-features": ["error", {
            version: "^3.0.0",
        }],

        "vue/no-useless-mustaches": ["error"],
        "vue/no-useless-v-bind": ["error"],
        "vue/padding-line-between-blocks": ["error"],
        "vue/require-direct-export": ["error"],
        "vue/require-name-property": ["error"],
        "vue/v-for-delimiter-style": ["error"],

        "vue/html-closing-bracket-newline": ["error", {
            singleline: "never",
            multiline: "never",
        }],

        "vue/html-self-closing": ["error", {
            html: {
                void: "always",
            },
        }],
    },
}, {
    files: ["**/*.spec.{j,t}s?(x)"],

    languageOptions: {
        globals: {
            ...globals.jest,
        },
        sourceType: "module",
    },
}]);
