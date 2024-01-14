import { expect, test } from "vitest";
import { getNewUrl } from "./setSearchParams";

test("should generate correct url", () => {
	expect(getNewUrl("/page/", "foo=5")).toBe("/page/?foo=5");
});
