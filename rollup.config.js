import path from "node:path";
import { fileURLToPath } from "node:url";
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import sucrase from "@rollup/plugin-sucrase";
import vue from "@vitejs/plugin-vue";
import externals from "rollup-plugin-node-externals";
import styles from "rollup-plugin-styles";

import pkg from "./package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
	{
		input: "src/components/index.js",
		external: ["vue"],
		output: {
			format: "es",
			file: pkg.module,
			assetFileNames: "[name][extname]",
		},
		plugins: [
			alias({
				entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
			}),
			externals({ deps: true }),
			replace({
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
				preventAssignment: true,
			}),
			styles({ mode: ["extract", "bundle.css"], url: { inline: true } }),
			resolve({ extensions: [".vue", ".js", ".css"] }),
			vue(),
			sucrase({
				transforms: ["typescript"],
			}),
		],
	},
	{
		input: "src/components/index.js",
		output: {
			format: "es",
			file: pkg.browser,
			assetFileNames: "[name][extname]",
		},
		plugins: [
			alias({
				entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
			}),
			// Not defined in browser
			replace({
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
				preventAssignment: true,
			}),
			resolve({ extensions: [".vue", ".js"] }),
			vue(),
			// Vue plugin won't handle CSS currently
			styles(),
			sucrase({
				transforms: ["typescript"],
			}),
		],
	},
];
