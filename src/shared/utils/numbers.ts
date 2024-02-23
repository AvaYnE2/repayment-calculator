export const formatNumberToGermanString = (number: number) => {
	const formatter = new Intl.NumberFormat("de-DE", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(number);
};

export const formatGermanStringToNumber = (string: string) => {
	const noThousandsSeparator = string.replace(/\./g, "");

	const normalizedDecimalSeparator = noThousandsSeparator.replace(/,/g, ".");

	const result = parseFloat(normalizedDecimalSeparator);

	return result;
};

export function round(value: number) {
	return Math.round(value * 100) / 100;
}
