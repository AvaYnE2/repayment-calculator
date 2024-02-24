import { CalculationFormKeys } from "@/shared/types/calculation";

export type ParamFormatterFunctions = Record<
	CalculationFormKeys,
	(value: string) => string
>;
