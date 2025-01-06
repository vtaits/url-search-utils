import { expect, spyOn, test } from "bun:test";
import { setHashParams } from "./setHashParams";

const replaceState = spyOn(window.history, "replaceState");

test("should set hash params", () => {
	replaceState.mockClear();

	setHashParams({
		foo: 5,
	});

	expect(replaceState).toHaveBeenCalledTimes(1);
	expect(replaceState).toHaveBeenCalledWith(null, "", "#foo=5");
});
