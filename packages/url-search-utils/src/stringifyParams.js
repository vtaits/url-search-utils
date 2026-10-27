/**
 * @typedef {string | number | boolean} AtomicParam
 */

/**
 * @typedef {AtomicParam | readonly AtomicParam[]} Param
 */

/**
 * @typedef {((value: Param | null) => AtomicParam | null) | "exclude" | "include-if-falsy"} ParamType
 */

/**
 * @param {Record<string, Param | null>} params
 * @param {Partial<Record<string, string>>} [mapParamsNames={}]
 * @param {Partial<Record<string, ParamType>>} [paramTypes={}]
 * @returns
 */
export function stringifyParams(params, mapParamsNames = {}, paramTypes = {}) {
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
						// biome-ignore lint/suspicious/useIsArray: `typescript` doesn't infer correctly `Array.isArray`
						if (paramValue instanceof Array) {
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

			// biome-ignore lint/suspicious/useIsArray: `typescript` doesn't infer correctly `Array.isArray`
			if (paramValue instanceof Array) {
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
