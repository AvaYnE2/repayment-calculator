import { type RepaymentPlan } from "@/shared/types/calculation";
import { formatNumberToGermanString, round } from "@/shared/utils/numbers";
import { DateTime } from "luxon";

export const calculateRepaymentPlan = (
	loanAmount: number,
	interestRateDezimal: number,
	monthlyRate: number,
) => {
	const monthlyInterestRate = interestRateDezimal / 12;
	// start with the following month
	let month = DateTime.now().month + 1;
	let year = DateTime.now().year;
	let currentAmount = loanAmount;
	let annualPrincipalPayment = 0;
	let annualInterestPayment = 0;
	let annualRate = 0;
	const plan: RepaymentPlan[] = [];

	while (currentAmount > 0) {
		const monthlyInterestPayment = currentAmount * monthlyInterestRate;

		const actualMonthlyPayment = Math.min(
			monthlyRate,
			currentAmount + monthlyInterestPayment,
		);

		const monthlyPrincipalPayment =
			actualMonthlyPayment - monthlyInterestPayment;

		// Update annual values
		annualPrincipalPayment += round(monthlyPrincipalPayment);
		annualInterestPayment += round(monthlyInterestPayment);
		annualRate += round(actualMonthlyPayment);

		// Update remaining debt
		currentAmount -= monthlyPrincipalPayment;

		// year is over or debt is paid off
		if (month === 12 || currentAmount <= 0) {
			plan.push({
				year: `${year}`,
				rate: formatNumberToGermanString(annualRate),
				interestPortion: formatNumberToGermanString(annualInterestPayment),
				repaymentPortion: formatNumberToGermanString(annualPrincipalPayment),
				remainingDebt: formatNumberToGermanString(currentAmount),
			});
			// Reset annual values
			annualPrincipalPayment = 0;
			annualInterestPayment = 0;
			annualRate = 0;
			year++;
			month = 0;
		}
		month++;
	}
	return plan;
};
