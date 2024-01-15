import { expect, test, vi } from "vitest";
import { setHashParams } from "./setHashParams";

const replaceState = vi.spyOn(window.history, "replaceState");

test("should set hash params", () => {
	setHashParams({
		foo: 5,
	});

	expect(replaceState).toHaveBeenCalledTimes(1);
	expect(replaceState).toHaveBeenCalledWith(null, "", "#foo=5");
});
