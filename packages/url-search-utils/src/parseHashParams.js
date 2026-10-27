import { parseQuery } from "./parseQuery.js";

/**
 * @import { ParamType } from "./parseQuery.js"
 */

/**
 * @param {Partial<Record<string, ParamType>>} [paramTypes={}]
 */
export function parseHashParams(paramTypes = {}) {
	const search = window.location.hash.replace(/^#/, "");

	return parseQuery(search, paramTypes);
}
