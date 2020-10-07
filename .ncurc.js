'use strict'

module.exports = {
  reject: [
    // `autoprefixer` and its peerDep, `postcss` are not yet ready for
    //    Rollup; remove when implemented:
    //    https://github.com/egoist/rollup-plugin-postcss/pull/325
    'autoprefixer',
    'postcss',
  ],
}
