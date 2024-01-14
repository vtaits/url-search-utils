export type AtomicParam = string | number | boolean;

export type Param = AtomicParam | readonly AtomicParam[];

export type ParamType =
	| ((value: Param | null) => AtomicParam | null)
	| "exclude"
	| "include-if-falsy";

export function stringifyParams(
	params: Record<string, Param | null>,
	mapParamsNames: Partial<Record<string, string>> = {},
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	return Object.keys(params)
		.map((rawParamName) => {
			const paramName = mapParamsNames[rawParamName] || rawParamName;
			const paramValue = params[rawParamName];

			const paramType = paramTypes[paramName];

			if (paramType) {
				if (typeof paramType === "function") {
					const mappedParamValue = paramType(paramValue);

					if (
						mappedParamValue === null ||
						typeof mappedParamValue === "undefined"
					) {
						return null;
					}

					return `${paramName}=${encodeURIComponent(mappedParamValue)}`;
				}

				switch (paramType) {
					case "exclude":
						return null;

					case "include-if-falsy":
						if (Array.isArray(paramValue)) {
							if (paramValue.length === 0) {
								return null;
							}

							return paramValue
								.map(
									(paramValueItem) =>
										`${paramName}=${encodeURIComponent(paramValueItem)}`,
								)
								.join("&");
						}

						return `${paramName}=${encodeURIComponent(paramValue || "")}`;

					default:
						throw new Error(
							`Unknown type of parameter for serialize "${paramName}": "${paramType}"`,
						);
				}
			}

			if (Array.isArray(paramValue)) {
				if (paramValue.length === 0) {
					return null;
				}

				return paramValue
					.map(
						(paramValueItem) =>
							`${paramName}=${encodeURIComponent(paramValueItem)}`,
					)
					.join("&");
			}

			if (!paramValue) {
				return null;
			}

			return `${paramName}=${encodeURIComponent(paramValue)}`;
		})
		.filter((item) => item !== null)
		.join("&");
}
