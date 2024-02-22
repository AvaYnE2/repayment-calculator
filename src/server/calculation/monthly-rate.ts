interface MonthlyRateProps {
	loanAmount: number;
	interestRatePercentage: number;
	initialRepaymentRatePercentage: number;
}

export const calculateMonthlyRate = <T extends MonthlyRateProps>({
	loanAmount,
	interestRatePercentage,
	initialRepaymentRatePercentage,
}: T) => {
	const yearlyAnnuity =
		loanAmount * (interestRatePercentage + initialRepaymentRatePercentage);

	const monthlyRate = yearlyAnnuity / 12;

	return monthlyRate.toFixed(2);
};
