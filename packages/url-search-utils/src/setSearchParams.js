import { stringifyParams } from "./stringifyParams.js";

/**
 * @import { Param, ParamType } from "./stringifyParams.js"
 */

/**
 * @param {string} pathname
 * @param {string} paramsStr
 */
export const getNewUrl = (pathname, paramsStr) => `${pathname}?${paramsStr}`;

/**
 * @param {Record<string, Param | null>} params
 * @param {Partial<Record<string, string>>} [mapParamsNames={}]
 * @param {Partial<Record<string, ParamType>>} [paramTypes={}]
 */
export function setSearchParams(params, mapParamsNames = {}, paramTypes = {}) {
	const paramsStr = stringifyParams(params, mapParamsNames, paramTypes);
	const newUrl = getNewUrl(window.location.pathname, paramsStr);

	window.history.replaceState({}, "", newUrl);
}
