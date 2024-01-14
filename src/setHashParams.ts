import { type Param, type ParamType, stringifyParams } from "./stringifyParams";

export function setHashParams(
	params: Record<string, Param | null>,
	mapParamsNames: Partial<Record<string, string>> = {},
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	const paramsStr = stringifyParams(params, mapParamsNames, paramTypes);

	window.history.replaceState(null, "", `#${paramsStr}`);
}
