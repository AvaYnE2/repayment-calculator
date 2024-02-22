import { type RepaymentPlan } from "@/shared/types/calculation";
import { formatNumber } from "@/shared/utils/format-number";
import { DateTime } from "luxon";

export const calculateRepaymentPlan = <
	T extends {
		loanAmount: number;
		interestRateDezimal: number;
		fixedInterestPeriod: number;
		monthlyRate: number;
	},
>({
	loanAmount,
	interestRateDezimal,
	fixedInterestPeriod,
	monthlyRate,
}: T) => {
	let debt = loanAmount;
	const monthlyInterestRate = interestRateDezimal / 12;
	const plan: RepaymentPlan[] = [];

	const now = DateTime.now();

	for (let year = 1; year <= fixedInterestPeriod; year++) {
		let interestAmountYear = 0;
		let repaymentAmountYear = 0;
		for (let month = 0; month < 12; month++) {
			const interestPerMonth = debt * monthlyInterestRate;
			const principalRepayment = monthlyRate - interestPerMonth;
			debt -= principalRepayment;
			interestAmountYear += interestPerMonth;
			repaymentAmountYear += principalRepayment;
		}

		plan.push({
			year: now.plus({ year }).toFormat("yyyy"),
			rate: formatNumber(monthlyRate),
			interestPortion: formatNumber(interestAmountYear),
			repaymentPortion: formatNumber(repaymentAmountYear),
			remainingDebt: formatNumber(debt),
		});
	}

	return plan;
};
