import path from "node:path";
import queryString from "query-string";

/** Parsed Vue SFC query. */
export type Query =
	| { vue: false }
	| {
			filename: string;
			vue: true;
			type: "custom";
			index?: number;
			src: boolean;
	  }
	| { filename: string; vue: true; type: "template"; id?: string; src: boolean }
	| { filename: string; vue: true; type: "script"; src: boolean }
	| {
			filename: string;
			vue: true;
			type: "style";
			index?: number;
			id?: string;
			scoped?: boolean;
			module?: string | boolean;
			src: boolean;
	  };

export function parseQuery(id: string): Query {
	const [filename, query] = id.split("?", 2);
	if (!query) return { vue: false };

	const raw = queryString.parse(query);
	if (!("vue" in raw)) return { vue: false };

	return {
		...raw,
		filename,
		vue: true,
		index: raw.index && Number(raw.index),
		src: "src" in raw,
		scoped: "scoped" in raw,
	} as Query;
}

export function normalizePath(...paths: string[]): string {
	const f = path.join(...paths).replace(/\\/g, "/");
	if (/^\.[/\\]/.test(paths[0])) return `./${f}`;
	return f;
}
