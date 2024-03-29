import { round } from "@/shared/utils/numbers";

export const calculateMonthlyRate = (
	loanAmount: number,
	interestRateDezimal: number,
	initialRepaymentRateDezimal: number,
) => {
	const yearlyAnnuity =
		loanAmount * (interestRateDezimal + initialRepaymentRateDezimal);

	const monthlyRate = yearlyAnnuity / 12;

	return round(monthlyRate);
};

export const calculateRemainingDebt = (
	loanAmount: number,
	interestRate: number,
	interestPeriod: number,
	monthlyRate: number,
) => {
	let debt = loanAmount;
	const monthlyRateDezimal = interestRate / 100 / 12;
	const interestPeriodInMonths = interestPeriod * 12;

	for (let month = 0; month < interestPeriodInMonths; month++) {
		if (debt <= 0) {
			debt = 0;
			break;
		}
		const interestAmount = debt * monthlyRateDezimal;
		const repaymentAmount = monthlyRate - interestAmount;
		debt -= round(repaymentAmount);
	}

	return round(debt);
};
