import { numberCalculationSchema } from "@/app/_components/calculator/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { calculateLoanDetails } from "@/server/calculation/calculation";

export const calculationRouter = createTRPCRouter({
	calculateRepayment: publicProcedure
		.input(numberCalculationSchema)
		.mutation(({ input }) => {
			console.time("calculation");
			const calcuatedData = calculateLoanDetails(input);
			console.timeEnd("calculation");
			return calcuatedData;
		}),
});
