import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve';

// import typescript from '@rollup/plugin-typescript'
// import typescript from 'rollup-plugin-typescript'
// See https://github.com/vuejs/rollup-plugin-vue/issues/322 on why using this:
import typescript from 'rollup-plugin-typescript2'

// eslint-disable-next-line import/no-anonymous-default-export -- Used internally by Rollup
export default {
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
        // with @rollup/plugin-typescript
        /*
        typescript({
          include: [/\.tsx?$/, /\.vue\?.*?lang=ts/]
        }),
        */
    ]
}
