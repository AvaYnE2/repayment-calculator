import { z } from "zod";

export const formSchema = z.object({
	loanAmount: z
		.string()
		.min(1, "darlehensbetrag ist erforderlich")
		.regex(/^\d+(\.\d{1,2})?$/, {
			message: "darlehensbetrag muss eine Zahl sein",
		}),
	interestRate: z
		.string()
		.min(1, "Sollzinssatz ist erforderlich")
		.regex(/^\d+(\.\d{1,2})?$/, {
			message: "Sollzinssatz muss eine Zahl sein",
		}),
	initialRepaymentRate: z
		.string()
		.min(1, "Anfängliche Tilgung ist erforderlich")
		.regex(/^\d+(\.\d{1,2})?$/, {
			message: "Anfängliche Tilgung muss eine Zahl sein",
		}),
	fixedInterestPeriod: z
		.string()
		.min(1, "Zinsbindungsdauer ist erforderlich")
		.regex(/^\d+(\.\d{1,2})?$/, {
			message: "Zinsbindungsdauer muss eine Zahl sein",
		})
		.optional(),
});
