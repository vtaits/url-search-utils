export type ParamType =
	| ((value: string, acc: unknown) => unknown)
	| "array-of-strings"
	| "array-of-numbers"
	| "number"
	| "exclude";

export function parseQuery(
	search: string,
	paramTypes: Partial<Record<string, ParamType>> = {},
) {
	if (search.length === 0) {
		return {};
	}

	return search
		.split("&")
		.reduce<Partial<Record<string, unknown>>>((res, searchItem) => {
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
		}, {});
}
