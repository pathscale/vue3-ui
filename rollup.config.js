import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

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
          extensions: ['.vue', '.js', '.css']
        }),
        vue({
          template: {
            isProduction: true
          }
        }),
        postcss({
          extract: 'bundle.css'
        }),
        copy({
          targets: [
            { src: 'src/assets/*', dest: 'dist/assets' },
          ]
        })
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
