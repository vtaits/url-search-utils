import { stringifyParams } from "./stringifyParams.js";

/**
 * @import { Param, ParamType } from "./stringifyParams.js"
 */

/**
 * @param {Record<string, Param | null>} params
 * @param {Partial<Record<string, string>>} [mapParamsNames={}]
 * @param {Partial<Record<string, ParamType>>} [paramTypes={}]
 */
export function setHashLocationQuery(
	params,
	mapParamsNames = {},
	paramTypes = {},
) {
	const paramsStr = stringifyParams(params, mapParamsNames, paramTypes);

	const hashWithoutSearch = window.location.hash
		.replace(/^#/, "")
		.split("?")[0];

	window.history.replaceState(null, "", `#${hashWithoutSearch}?${paramsStr}`);
}
