import { z } from "zod";

export const calculationSchema = z.object({
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
		}),
});

export const numberCalculationSchema = z.object({
	loanAmount: z
		.number({
			required_error: "darlehensbetrag ist erforderlich",
			invalid_type_error: "darlehensbetrag muss eine Zahl sein",
		})
		.min(1, "darlehensbetrag muss größer als 0 sein"),
	interestRate: z
		.number({
			required_error: "Sollzinssatz ist erforderlich",
			invalid_type_error: "Sollzinssatz muss eine Zahl sein",
		})
		.min(1, "Sollzinssatz muss größer als 0 sein"),
	initialRepaymentRate: z
		.number({
			required_error: "Anfängliche Tilgung ist erforderlich",
			invalid_type_error: "Anfängliche Tilgung muss eine Zahl sein",
		})
		.min(1, "Anfängliche Tilgung muss größer als 0 sein"),
	fixedInterestPeriod: z.number({
		invalid_type_error: "Zinsbindungsdauer muss eine Zahl sein",
	}),
});
