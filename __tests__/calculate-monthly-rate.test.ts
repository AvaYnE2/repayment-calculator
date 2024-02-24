import { calculateMonthlyRate } from "@/server/calculation/details";
import { describe, expect, test } from "vitest";

// loanAmount, interestRateDezimal, initialRepaymentRateDezimal, expected
const testCase = [
	[250_000, 2 / 100, 2 / 100, 833.33],
	[4_923_569, 2 / 100, 2 / 100, 16_411.9],
	[682_913, 5 / 100, 2 / 100, 3_983.66],
	[3_295_650, 3.08 / 100, 2 / 100, 13_951.59],
	[526_664, 3.08 / 100, 2.38 / 100, 2396.32],
];
describe("Calculate monthly rate", () => {
	for (const [
		loanAmount,
		interestRateDezimal,
		initialRepaymentRateDezimal,
		expected,
	] of testCase) {
		if (
			loanAmount &&
			interestRateDezimal &&
			initialRepaymentRateDezimal &&
			expected
		) {
			test(`should correctly calculate the monthly rate for loan amount ${loanAmount}, interest rate ${interestRateDezimal}, initial repayment rate ${initialRepaymentRateDezimal}`, () => {
				expect(
					calculateMonthlyRate(
						loanAmount,
						interestRateDezimal,
						initialRepaymentRateDezimal,
					),
				).toBe(expected);
			});
		} else {
			throw new Error("Invalid test case");
		}
	}
});
