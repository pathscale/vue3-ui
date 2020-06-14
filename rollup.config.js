import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const port = 8080;

const productionConfig = {
    input: 'src/components/index.ts',
    output: {
        format: 'esm',
        file: 'dist/bundle.js'
    },
    plugins: [
        resolve(),
        vue(),
        postcss(),
        typescript()
    ]
}

const developmentConfig = {
    input: 'src/main.js',
    output: {
        file: 'public/assets/app.js',
        format: 'iife',
        sourcemap: false,
        name: 'app',
    },
    plugins: [
        resolve({ extensions: ['.js', '.vue'], browser: true, preferBuiltins: true }),
        vue({ css: false }),
        postcss({ extract: true }),
        // typescript(),
        replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        commonjs(),
        esbuild({
        target: 'es2015',
        }),
        serve({
            open: true,
            contentBase: 'public',
            historyApiFallback: true,
            port,
        }),
        livereload('public'),
    ]
}

// eslint-disable-next-line import/no-anonymous-default-export -- Used internally by Rollup
export default commandLineArgs => {
    if (commandLineArgs.configDev === true) {
        return developmentConfig;
    }
    return productionConfig;
}