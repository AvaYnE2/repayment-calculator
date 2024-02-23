import { numberCalculationSchema } from "@/app/_components/calculator/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { calculateLoanDetails } from "@/server/calculation/calculation";

export const calculationRouter = createTRPCRouter({
	calculateRepayment: publicProcedure
		.input(numberCalculationSchema)
		.mutation(({ input }) => {
			const calcuatedData = calculateLoanDetails(input);
			return calcuatedData;
		}),
});
