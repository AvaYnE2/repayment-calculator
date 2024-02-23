import { formatCurrency } from "@/app/_components/shared/utils/format-number-input";
import { describe, expect, test } from "vitest";

describe("Input Formatting Test", () => {
	test("test right formatting while typing more digits", () => {
		let initInput = "40";
		for (let i = 0; i < 10; i++) {
			const inputString = initInput + i;
			const number = parseFloat(inputString);
			const expected = new Intl.NumberFormat("de-DE", {
				style: "decimal",
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			}).format(number);
			expect(formatCurrency(inputString)).toBe(expected);
			initInput += i;
		}
	});

	test("test handling of invalid input", () => {
		const inputs: string[] = ["abc", "", "@#$%", " "];
		const expectedResults: string[] = ["", "", "", ""];
		inputs.forEach((input, i) => {
			expect(formatCurrency(input)).toBe(expectedResults[i]);
		});
	});

	test("test formatting of large numbers", () => {
		const input = "12000000";
		const expected = "12.000.000";
		expect(formatCurrency(input)).toBe(expected);
	});

	test("test formatting of decimal numbers", () => {
		const input = "12000000,5";
		const expected = "12.000.000,5";
		expect(formatCurrency(input)).toBe(expected);
	});

	test("test formatting of decimal numbers with more than 2 decimal places", () => {
		const input = "12000000,555";
		const expected = "12.000.000,55";
		expect(formatCurrency(input)).toBe(expected);
	});

	test("should correctly format '.' to '0,'", () => {
		const input = ".";
		const expected = "0";
		expect(formatCurrency(input)).toBe(expected);
	});
});
