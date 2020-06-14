import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

// eslint-disable-next-line import/no-anonymous-default-export -- Used internally by Rollup
export default [{
    input: 'src/components/index.js',
    external: ['vue'],
    output: {
        format: 'esm',
        file: 'dist/bundle.js'
    },
    plugins: [
        resolve({
          extensions: ['.vue', '.js']
        }),
        vue({
          template: {
            isProduction: true
          }
        }),
        // Vue plugin won't handle CSS currently
        postcss(),
    ]
}, {
    input: 'src/components/index.js',
    output: {
        format: 'esm',
        file: 'dist/bundle-browser.js'
    },
    plugins: [
        resolve({
          extensions: ['.vue', '.js']
        }),
        vue({
          template: {
            isProduction: false
          }
        }),
        // Vue plugin won't handle CSS currently
        postcss(),
        // Not defined in browser
        replace({
          'process.env.NODE_ENV': "'production'"
        }),
    ]
}]
