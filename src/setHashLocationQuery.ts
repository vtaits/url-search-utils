import { type Param, type ParamType, stringifyParams } from "./stringifyParams";

export function setHashLocationQuery(
	params: Record<string, Param | null>,
	mapParamsNames: Partial<Record<string, string>> = {},
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	const paramsStr = stringifyParams(params, mapParamsNames, paramTypes);

	const hashWithoutSearch = window.location.hash
		.replace(/^#/, "")
		.split("?")[0];

	window.history.replaceState(null, "", `#${hashWithoutSearch}?${paramsStr}`);
}
