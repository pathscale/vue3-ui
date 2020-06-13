import vue from 'rollup-plugin-vue'
// See https://github.com/vuejs/rollup-plugin-vue/issues/322 on why using this:
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

// eslint-disable-next-line import/no-anonymous-default-export -- Used internally by Rollup
export default [{
    input: 'src/components/index.ts',
    output: {
        format: 'esm',
        file: 'dist/bundle.js'
    },
    plugins: [
        resolve(),
        vue(),
        // Vue plugin won't handle CSS currently
        postcss(),
        typescript()
    ]
}, {
    input: 'src/components/index.ts',
    output: {
        format: 'esm',
        file: 'dist/bundle-browser.js'
    },
    plugins: [
        resolve(),
        vue(),
        // Vue plugin won't handle CSS currently
        postcss(),
        typescript(),
        // Not defined in browser
        replace({
          'process.env.NODE_ENV': "'production'"
        }),
    ]
}]
