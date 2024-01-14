import { type ParamType, parseQuery } from "./parseQuery";

export function parseHashLocationQuery(
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	const search = window.location.hash.split("?")[1] || "";

	return parseQuery(search, paramTypes);
}
