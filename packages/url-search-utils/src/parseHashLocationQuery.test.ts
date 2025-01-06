import { expect, test } from "bun:test";
import { parseHashLocationQuery } from "./parseHashLocationQuery";

test("should parse hash location query", () => {
	window.location.hash = "#/page/?foo=5&bar=baz";

	const parsedParams = parseHashLocationQuery({
		foo: "number",
	});

	expect(parsedParams.foo).toEqual(5);
	expect(parsedParams.bar).toEqual("baz");
});
