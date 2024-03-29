import {
	type calculationSchema,
	type numberCalculationSchema,
} from "@/app/_components/calculator/schema";
import { type RouterOutputs } from "@/trpc/shared";
import { type z } from "zod";

export type NumberCalculationSchema = z.infer<typeof numberCalculationSchema>;
export type CalculationSchema = z.infer<typeof calculationSchema>;
export type CalculationFormKeys = keyof CalculationSchema;

export interface RepaymentPlan {
	year: string;
	rate: string;
	interestPortion: string;
	repaymentPortion: string;
	remainingDebt: string;
}

export type CalculationResponse =
	RouterOutputs["calculation"]["calculateRepayment"];
