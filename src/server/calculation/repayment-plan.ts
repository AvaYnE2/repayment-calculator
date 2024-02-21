import { type RepaymentPlan } from "@/shared/types/calculation";
import { DateTime } from "luxon";

export const calculateRepaymentPlan = <
	T extends {
		loanAmount: number;
		interestRatePercentage: number;
		fixedInterestPeriod: number;
	},
>({
	loanAmount,
	interestRatePercentage,
	fixedInterestPeriod,
}: T) => {
	let debt = loanAmount;
	const plan: RepaymentPlan[] = [];
	for (let year = 1; year <= fixedInterestPeriod; year++) {
		const interestThisMonth = debt * interestRatePercentage;
		const repaymentThisMonth = debt / fixedInterestPeriod;
		const rate = interestThisMonth + repaymentThisMonth;
		debt -= repaymentThisMonth;

		const now = DateTime.now();

		const yearDate = now.plus({ year }).toFormat("yyyy");

		plan.push({
			year: yearDate,
			rate: rate.toFixed(2),
			interestPortion: interestThisMonth.toFixed(2),
			repaymentPortion: repaymentThisMonth.toFixed(2),
			remainingDebt: debt.toFixed(2),
		});
	}

	return plan;
};
