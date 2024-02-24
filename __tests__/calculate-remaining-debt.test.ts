import { calculateRemainingDebt } from "@/server/calculation/details";
import { describe, expect, test } from "vitest";

// loanAmount, interestRate, interestPeriod, monthlyRate, expected
const testCase = [
	[250_000, 2, 10, 833.33, 194_700.59],
	[4_923_569, 2, 15, 16_411.9, 3_202_673.86],
	[682_913, 5, 6, 3_983.66, 587_573.47],
	[3_295_650, 3.08, 25, 13_951.59, 818_267.46],
	[526_664, 3.08, 9, 2_396.32, 396_857.04],
];
describe("Calculate Repayment Plan Test", () => {
	for (const [
		loanAmount,
		interestRate,
		interestPeriod,
		monthlyRate,
		expected,
	] of testCase) {
		if (
			loanAmount &&
			interestRate &&
			interestPeriod &&
			monthlyRate &&
			expected
		) {
			test(`should correctly calculate the remaining debt for loan amount ${loanAmount}, interest rate ${interestRate}, interest period ${interestPeriod}, monthly rate ${monthlyRate}`, () => {
				expect(
					calculateRemainingDebt(
						loanAmount,
						interestRate,
						interestPeriod,
						monthlyRate,
					),
				).toBe(expected);
			});
		} else {
			throw new Error("Invalid test case");
		}
	}
});
