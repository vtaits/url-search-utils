import { expect, test } from "vitest";
import { parseHashParams } from "./parseHashParams";

test("should parse hash params", () => {
	window.location.hash = "#foo=5&bar=baz";

	const parsedParams = parseHashParams({
		foo: "number",
	});

	expect(parsedParams.foo).toEqual(5);
	expect(parsedParams.bar).toEqual("baz");
});
