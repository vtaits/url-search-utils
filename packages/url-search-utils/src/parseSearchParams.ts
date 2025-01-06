import { type ParamType, parseQuery } from "./parseQuery";

export const prepareSearch = (search: string) =>
	search.substring(1, search.length);

export function parseSearchParams(
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	const search = prepareSearch(window.location.search);

	return parseQuery(search, paramTypes);
}
