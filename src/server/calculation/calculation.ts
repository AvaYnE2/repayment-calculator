import {
	calculateMonthlyRate,
	calculateRemainingDebt,
} from "@/server/calculation/details";
import { calculateRepaymentPlan } from "@/server/calculation/repayment-plan";
import { type NumberCalculationSchema } from "@/shared/types/calculation";
import { formatNumber } from "@/shared/utils/numbers";

export const calculateLoanDetails = async <T extends NumberCalculationSchema>({
	loanAmount,
	interestRate,
	initialRepaymentRate,
	fixedInterestPeriod,
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

	const remainingDebt = calculateRemainingDebt(
		loanAmount,
		interestRate,
		fixedInterestPeriod,
		monthlyRate,
	);

	return {
		monthlyRate: formatNumber(monthlyRate),
		remainingDebt: formatNumber(remainingDebt),
		repaymentPlan,
	};
};
