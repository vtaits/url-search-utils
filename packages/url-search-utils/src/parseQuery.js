/**
 * @typedef {((value: string, acc: unknown) => unknown) | "array-of-strings" | "array-of-numbers" | "number" | "exclude"} ParamType
 */

/**
 * @param {string} search
 * @param {Partial<Record<string, ParamType>>} [paramTypes={}]
 * @returns
 */
export function parseQuery(search, paramTypes = {}) {
	if (search.length === 0) {
		return {};
	}

	return search.split("&").reduce(
		/**
		 * @param {Partial<Record<string, unknown>>} res
		 * @param {string} searchItem
		 */
		(res, searchItem) => {
			const [name, rawValue] = searchItem.split("=");
			const value = decodeURIComponent(rawValue);

			const paramType = paramTypes[name];

			if (paramType) {
				if (typeof paramType === "function") {
					res[name] = paramType(value, res[name]);

					return res;
				}

				switch (paramType) {
					case "array-of-strings": {
						if (!res[name]) {
							res[name] = [];
						}

						const acc = res[name];

						if (!Array.isArray(acc)) {
							throw new Error("accumulator is not an array");
						}

						acc.push(value);

						return res;
					}

					case "array-of-numbers": {
						if (!res[name]) {
							res[name] = [];
						}

						const acc = res[name];

						if (!Array.isArray(acc)) {
							throw new Error("accumulator is not an array");
						}

						acc.push(Number.parseFloat(value));

						return res;
					}

					case "number":
						res[name] = Number.parseFloat(value);

						return res;

					case "exclude":
						return res;

					default:
						throw new Error(
							`Unknown type of parameter for parse "${name}": "${paramType}"`,
						);
				}
			}

			res[name] = value;

			return res;
		},
		{},
	);
}
