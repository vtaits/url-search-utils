import { expect, test, vi } from "bun:test";
import { setHashLocationQuery } from "./setHashLocationQuery";

const replaceState = vi.spyOn(window.history, "replaceState");

test("should set hash location query", () => {
	window.location.hash = "/page/";

	setHashLocationQuery({
		foo: 5,
	});

	expect(replaceState).toHaveBeenCalledTimes(1);
	expect(replaceState).toHaveBeenCalledWith(null, "", "#/page/?foo=5");
});
