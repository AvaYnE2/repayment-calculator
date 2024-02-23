import { round } from "@/shared/utils/numbers";

export const calculateMonthlyRate = (
	loanAmount: number,
	interestRateDezimal: number,
	initialRepaymentRateDezimal: number,
) => {
	const yearlyAnnuity =
		loanAmount * (interestRateDezimal + initialRepaymentRateDezimal);

	const monthlyRate = yearlyAnnuity / 12;

	return monthlyRate;
};

export const calculateRemainingDebt = (
	loanAmount: number,
	interestRate: number,
	fixedInterestPeriod: number,
	monthlyRate: number,
) => {
	let debt = loanAmount;
	const monthlyRateDezimal = interestRate / 100 / 12;

	const fixedInterestPeriodInMonths = fixedInterestPeriod * 12;

	for (let month = 0; month < fixedInterestPeriodInMonths; month++) {
		const interestAmount = debt * monthlyRateDezimal;
		const repaymentAmount = round(monthlyRate) - interestAmount;
		debt -= repaymentAmount;
	}

	return debt;
};
