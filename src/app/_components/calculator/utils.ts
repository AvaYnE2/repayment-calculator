import { type calculationSchema } from "@/app/_components/calculator/schema";
import type { z } from "zod";

export const oneToThirtyArray = Array.from(
	{ length: 30 },
	(_, i) => `${i + 1}`,
);

export function parseNumber(data: z.infer<typeof calculationSchema>) {
	return {
		...data,
		loanAmount: parseFloat(data.loanAmount),
		interestRate: parseFloat(data.interestRate),
		initialRepaymentRate: parseFloat(data.initialRepaymentRate),
		fixedInterestPeriod: parseInt(data.fixedInterestPeriod),
	};
}
