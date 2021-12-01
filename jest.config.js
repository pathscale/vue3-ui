'use strict'

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: ['**/*.spec.js', '**/*.spec.jsx'],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
}
