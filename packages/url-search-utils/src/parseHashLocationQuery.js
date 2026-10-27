import { parseQuery } from "./parseQuery.js";

/**
 * @import { ParamType } from "./parseQuery.js"
 */

/**
 * @param {Partial<Record<string, ParamType>>} [paramTypes={}]
 */
export function parseHashLocationQuery(paramTypes = {}) {
	const search = window.location.hash.split("?")[1] || "";

	return parseQuery(search, paramTypes);
}
