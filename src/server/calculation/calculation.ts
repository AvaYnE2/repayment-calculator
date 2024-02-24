import {
	calculateMonthlyRate,
	calculateRemainingDebt,
} from "@/server/calculation/details";
import { calculateRepaymentPlan } from "@/server/calculation/repayment-plan";
import { type NumberCalculationSchema } from "@/shared/types/calculation";
import { formatNumberToGermanString } from "@/shared/utils/numbers";

export const calculateLoanDetails = async <T extends NumberCalculationSchema>({
	loanAmount,
	interestRate,
	initialRepaymentRate,
	interestPeriod,
}: T) => {
	const interestRateDezimal = interestRate / 100;
	const initialRepaymentRateDezimal = initialRepaymentRate / 100;

	const monthlyRate = calculateMonthlyRate(
		loanAmount,
		interestRateDezimal,
		initialRepaymentRateDezimal,
	);

	const repaymentPlan = calculateRepaymentPlan(
		loanAmount,
		interestRateDezimal,
		monthlyRate,
	);

	if (interestPeriod === 0) {
		return {
			monthlyRate: formatNumberToGermanString(monthlyRate),
			remainingDebt: null,
			repaymentPlan,
		};
	}
	const remainingDebt = calculateRemainingDebt(
		loanAmount,
		interestRate,
		interestPeriod,
		monthlyRate,
	);

	return {
		monthlyRate: formatNumberToGermanString(monthlyRate),
		remainingDebt: formatNumberToGermanString(remainingDebt),
		repaymentPlan,
	};
};
