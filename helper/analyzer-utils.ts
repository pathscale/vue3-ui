import {
	type SFCScriptBlock,
	type SFCTemplateBlock,
	parse,
} from "@vue/compiler-sfc";

export interface ParsedSFC {
	template: SFCTemplateBlock | null;
	script: SFCScriptBlock | null;
}

export function parseSFC(code: string, id: string): ParsedSFC {
	const {
		descriptor: { template, script },
	} = parse(code, {
		sourceMap: false,
		sourceRoot: process.cwd(),
		filename: id,
		pad: "line",
	});

	return { template, script };
}

export function isVueSFC(id: string): boolean {
	return /\.vue$/i.test(id);
}
