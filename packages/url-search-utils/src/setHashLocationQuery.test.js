import { expect, test, vi } from "bun:test";
import { setHashLocationQuery } from "./setHashLocationQuery.js";

const replaceState = vi.spyOn(window.history, "replaceState");

test("should set hash location query", () => {
	window.location.hash = "/page/";

	expect(replaceState).toHaveBeenCalledTimes(1);

	setHashLocationQuery({
		foo: 5,
	});

	expect(replaceState).toHaveBeenCalledTimes(2);
	expect(replaceState).toHaveBeenCalledWith(null, "", "#/page/?foo=5");
});
