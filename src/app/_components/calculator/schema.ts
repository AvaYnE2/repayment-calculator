import { formatGermanStringToNumber } from "@/shared/utils/numbers";
import { z } from "zod";

export const calculationSchema = z.object({
	loanAmount: z
		.string()
		.min(1, "Darlehensbetrag ist erforderlich")
		.refine(
			(value) => {
				const formattedNumber = formatGermanStringToNumber(value);
				return formattedNumber >= 1 && formattedNumber <= 100_000_000;
			},
			{
				message:
					"Darlehensbetrag muss eine Zahl zwischen 1 und 100.000.000 sein",
				params: {},
			},
		),
	interestRate: z
		.string()
		.min(1, "Sollzinssatz ist erforderlich")
		.refine(
			(value) => {
				const formattedNumber = formatGermanStringToNumber(value);
				return formattedNumber >= 0 && formattedNumber <= 100;
			},
			{
				message: "Sollzinssatz muss eine Zahl zwischen 0 und 100 sein",
				params: {},
			},
		),
	initialRepaymentRate: z
		.string()
		.min(1, "Anfängliche Tilgung ist erforderlich")
		.refine(
			(value) => {
				const formattedNumber = formatGermanStringToNumber(value);
				return formattedNumber >= 0 && formattedNumber <= 100;
			},
			{
				message: "Anfängliche Tilgung muss eine Zahl zwischen 0 und 100 sein",
				params: {},
			},
		),
	fixedInterestPeriod: z
		.string()
		.min(1, "Zinsbindungsdauer ist erforderlich")
		.refine(
			(value) => {
				const formattedNumber = formatGermanStringToNumber(value);
				return formattedNumber >= 0 && formattedNumber <= 30;
			},
			{
				message: "Zinsbindungsdauer muss eine Zahl zwischen 0 und 100 sein",
				params: {},
			},
		),
});

export const numberCalculationSchema = z.object({
	loanAmount: z
		.number({
			required_error: "darlehensbetrag ist erforderlich",
			invalid_type_error: "darlehensbetrag muss eine Zahl sein",
		})
		.min(1, "darlehensbetrag muss größer als 0 sein")
		.max(100_000_000, "darlehensbetrag muss kleiner als 100.000.000 sein"),
	interestRate: z
		.number({
			required_error: "Sollzinssatz ist erforderlich",
			invalid_type_error: "Sollzinssatz muss eine Zahl sein",
		})
		.min(0, "Sollzinssatz darf nicht negativ sein")
		.max(100, "Sollzinssatz muss kleiner als 100"),
	initialRepaymentRate: z
		.number({
			required_error: "Anfängliche Tilgung ist erforderlich",
			invalid_type_error: "Anfängliche Tilgung muss eine Zahl sein",
		})
		.min(0, "Anfängliche Tilgung darf nicht negativ sein")
		.max(100, "Anfängliche Tilgung muss kleiner als 100"),
	fixedInterestPeriod: z
		.number({
			invalid_type_error: "Zinsbindungsdauer muss eine Zahl sein",
		})
		.min(0, "Zinsbindungsdauer darf nicht negativ sein")
		.max(30, "Zinsbindungsdauer muss kleiner als 30 sein"),
});
