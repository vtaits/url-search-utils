import { type ParamType, parseQuery } from "./parseQuery";

export function parseHashParams(
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	const search = window.location.hash.replace(/^#/, "");

	return parseQuery(search, paramTypes);
}
