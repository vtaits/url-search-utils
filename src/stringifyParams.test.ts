import { expect, test } from "vitest";
import { parseQuery } from "./parseQuery";
import { type ParamType, stringifyParams } from "./stringifyParams";

test("should return empty string for empty params object", () => {
	const result = stringifyParams({});

	expect(result).toEqual("");
});

test("should serialize simple params", () => {
	const result = stringifyParams({
		param1: "value1",
		param2: "value2",
	});

	const parsedResult = parseQuery(result);

	expect(parsedResult).toEqual({
		param1: "value1",
		param2: "value2",
	});
});

test("should map params names", () => {
	const result = stringifyParams(
		{
			param1: "value1",
			param2: "value2",
		},
		{
			param1: "mappedParam1",
		},
	);

	const parsedResult = parseQuery(result);

	expect(parsedResult).toEqual({
		mappedParam1: "value1",
		param2: "value2",
	});
});

test("should exclude parameter", () => {
	const result = stringifyParams(
		{
			param1: "value1",
			param2: "value2",
		},
		{},
		{
			param1: "exclude",
		},
	);

	const parsedResult = parseQuery(result);

	expect(parsedResult).toEqual({
		param2: "value2",
	});
});

test("should exclude falsy parameters", () => {
	const result = stringifyParams({
		param1: "value1",
		param2: "value2",
		falsyParam1: null,
		falsyParam2: false,
		falsyParam3: "",
	});

	const parsedResult = parseQuery(result);

	expect(parsedResult).toEqual({
		param1: "value1",
		param2: "value2",
	});
});

test('should not exclude falsy parameters thar marked "include-if-falsy"', () => {
	const result = stringifyParams(
		{
			param1: "value1",
			param2: "value2",
			falsyParam1: null,
			falsyParam2: false,
			falsyParam3: "",
		},
		{},
		{
			falsyParam2: "include-if-falsy",
			falsyParam1: "include-if-falsy",
		},
	);

	const parsedResult = parseQuery(result);

	expect(parsedResult).toEqual({
		param1: "value1",
		param2: "value2",
		falsyParam1: "",
		falsyParam2: "",
	});
});

test("should apply function for parameter", () => {
	const result = stringifyParams(
		{
			param1: "value1",
			param2: "value2",
			mappedParam: "test",
		},
		{},
		{
			mappedParam: (value) => `mapped-${value}`,
		},
	);

	const parsedResult = parseQuery(result);

	expect(parsedResult).toEqual({
		param1: "value1",
		param2: "value2",
		mappedParam: "mapped-test",
	});
});

test("should not include function result for parameter if function returns null", () => {
	const result = stringifyParams(
		{
			param1: "value1",
			param2: "value2",
			mappedParam: "test",
		},
		{},
		{
			mappedParam: () => null,
		},
	);

	const parsedResult = parseQuery(result);

	expect(parsedResult).toEqual({
		param1: "value1",
		param2: "value2",
	});
});

test("should throw an exception for unknown param type", () => {
	expect(() => {
		stringifyParams(
			{
				param1: "value1",
				param2: "value2",
				testParam: "test",
			},
			{},
			{
				testParam: "test-type" as unknown as ParamType,
			},
		);
	}).toThrowError(
		'Unknown type of parameter for serialize "testParam": "test-type"',
	);
});

test("should serialize array", () => {
	const result = stringifyParams({
		param1: "value1",
		param2: "value2",
		arrayParam: [1, "2", "test"],
	});

	const parsedResult = parseQuery(result, {
		arrayParam: "array-of-strings",
	});

	expect(parsedResult.param1).toEqual("value1");
	expect(parsedResult.param2).toEqual("value2");
	expect((parsedResult.arrayParam as string[]).sort()).toEqual([
		"1",
		"2",
		"test",
	]);
});

test("should not serialize empty array", () => {
	const result = stringifyParams({
		param1: "value1",
		param2: "value2",
		arrayParam: [],
	});

	const parsedResult = parseQuery(result, {
		arrayParam: "array-of-strings",
	});

	expect(parsedResult).toEqual({
		param1: "value1",
		param2: "value2",
	});
});
