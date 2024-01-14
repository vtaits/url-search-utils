import { type Param, type ParamType, stringifyParams } from "./stringifyParams";

export const getNewUrl = (pathname: string, paramsStr: string) =>
	`${pathname}?${paramsStr}`;

export function setSearchParams(
	params: Record<string, Param | null>,
	mapParamsNames: Partial<Record<string, string>> = {},
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	const paramsStr = stringifyParams(params, mapParamsNames, paramTypes);
	const newUrl = getNewUrl(window.location.pathname, paramsStr);

	window.history.replaceState({}, "", newUrl);
}
