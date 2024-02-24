import { type calculationSchema } from "@/app/_components/calculator/schema";
import { formatGermanStringToNumber } from "@/shared/utils/numbers";
import type { z } from "zod";

export const oneToThirtyArray = Array.from(
	{ length: 30 },
	(_, i) => `${i + 1}`,
);

export function parseNumber(data: z.infer<typeof calculationSchema>) {
	return {
		...data,
		loanAmount: formatGermanStringToNumber(data.loanAmount),
		interestRate: formatGermanStringToNumber(data.interestRate),
		initialRepaymentRate: formatGermanStringToNumber(data.initialRepaymentRate),
		interestPeriod: formatGermanStringToNumber(data.interestPeriod),
	};
}
