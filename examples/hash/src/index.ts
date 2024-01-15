import format from "date-fns/format";
import parse from "date-fns/parse";
import { unwrap } from "krustykrab";
import { parseHashParams, setHashParams } from "url-search-utils";

const strInput = unwrap(
	document.querySelector('[name="str"]'),
) as HTMLInputElement;
const checkboxes = [
	...document.querySelectorAll('[name="arr"]'),
] as HTMLInputElement[];
const dateInput = unwrap(
	document.querySelector('[name="date"]'),
) as HTMLInputElement;

const applyButton = unwrap(document.getElementById("apply"));

const currentParams = parseHashParams({
	arr: "array-of-strings",
	date: (value) => format(parse(value, "dd.MM.yyyy", new Date()), "yyyy-MM-dd"),
});

if (typeof currentParams.str === "string") {
	strInput.value = currentParams.str;
}

const arrValue = currentParams.arr;

if (arrValue instanceof Array) {
	checkboxes.forEach((checkbox) => {
		if (arrValue.includes(checkbox.value)) {
			checkbox.checked = true;
		}
	});
}

if (typeof currentParams.date === "string") {
	dateInput.value = currentParams.date;
}

applyButton.onclick = () => {
	const values = {
		str: strInput.value,
		arr: checkboxes.filter(({ checked }) => checked).map(({ value }) => value),
		date: dateInput.value,
	};

	setHashParams(
		values,
		{},
		{
			date: (date) =>
				date
					? format(parse(date, "yyyy-MM-dd", new Date()), "dd.MM.yyyy")
					: null,
		},
	);
};
