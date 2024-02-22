import { calculateMonthlyRate } from "@/server/calculation/monthly-rate";
import { calculateRepaymentPlan } from "@/server/calculation/repayment-plan";
import { type NumberCalculationSchema } from "@/shared/types/calculation";

export const calculateLoanDetails = <T extends NumberCalculationSchema>({
	loanAmount,
	interestRate,
	initialRepaymentRate,
	fixedInterestPeriod,
}: T) => {
	const interestRatePercentage = interestRate / 100; // i
	const initialRepaymentRatePercentage = initialRepaymentRate / 100; // t

	const monthlyRate = calculateMonthlyRate({
		loanAmount,
		interestRatePercentage,
		initialRepaymentRatePercentage,
	});

	const repaymentPlan = calculateRepaymentPlan({
		loanAmount,
		interestRatePercentage,
		initialRepaymentRate,
		fixedInterestPeriod,
	});

	return {
		monthlyRate,
		repaymentPlan,
	};
};
