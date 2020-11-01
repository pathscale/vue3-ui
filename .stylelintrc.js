'use strict'

module.exports = {
  // No apparent way to whitelist by extension, so disable others
  ignoreFiles: ['**/*.{js,ts,woff2,json,svg,jpeg,png}'],
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-value-no-unknown-custom-properties'],
  rules: {
    indentation: [
      4,
      {
        baseIndentLevel: 0,
      },
    ],
    'no-eol-whitespace': [
      true,
      {
        ignore: ['empty-lines'],
      },
    ],
    'csstools/value-no-unknown-custom-properties': true,
  },
}
