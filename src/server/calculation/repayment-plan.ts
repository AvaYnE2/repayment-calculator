import { type RepaymentPlan } from "@/shared/types/calculation";
import { formatNumber } from "@/shared/utils/format-number";
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
	const now = DateTime.now();

	for (let year = 0; year < fixedInterestPeriod; year++) {
		const interestAmount = debt * interestRatePercentage;
		const repaymentAmount = debt / fixedInterestPeriod;
		const rate = interestAmount + repaymentAmount;
		debt -= repaymentAmount;

		const yearDate = now.plus({ year }).toFormat("yyyy");

		plan.push({
			year: yearDate,
			rate: formatNumber(rate),
			interestPortion: formatNumber(interestAmount),
			repaymentPortion: formatNumber(repaymentAmount),
			remainingDebt: formatNumber(debt),
		});
	}

	return plan;
};
