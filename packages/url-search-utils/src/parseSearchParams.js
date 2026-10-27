import { parseQuery } from "./parseQuery.js";

/**
 * @import { ParamType } from "./parseQuery.js"
 */

/**
 * @param {string} search
 */
export const prepareSearch = (search) => search.substring(1, search.length);

/**
 * @param {Partial<Record<string, ParamType>>} [paramTypes={}]
 */
export function parseSearchParams(paramTypes = {}) {
	const search = prepareSearch(window.location.search);

	return parseQuery(search, paramTypes);
}
