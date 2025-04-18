import type { ParserOptions } from "@babel/parser";

export const parserOpts: ParserOptions = {
	sourceType: "unambiguous",
	plugins: [
		"asyncGenerators",
		"bigInt",
		"classPrivateMethods",
		"classPrivateProperties",
		"classProperties",
		"decimal",
		"doExpressions",
		"dynamicImport",
		"exportDefaultFrom",
		"functionBind",
		"functionSent",
		"importMeta",
		"jsx",
		"logicalAssignment",
		"nullishCoalescingOperator",
		"numericSeparator",
		"objectRestSpread",
		"optionalCatchBinding",
		"optionalChaining",
		"partialApplication",
		"placeholders",
		"privateIn",
		"throwExpressions",
		"typescript",
	],
};
