function baseFormat(value: string) {
	// Replace a dot at the end of the input with a comma
	const cleanInput = value.replace(/\.$/, ",");

	// If the input is only a comma, return "0"
	if (cleanInput === ",") {
		return "0";
	}

	// Remove leading zeros if followed by a number
	const withoutLeadingZeros = cleanInput.replace(/^0+(?=\d)/, "");

	// Remove all non-numeric characters except for the comma
	const numericAndCommaOnly = withoutLeadingZeros.replace(/[^\d,]/g, "");

	// Allow only one comma and remove all others
	const singleComma = numericAndCommaOnly.replace(
		/,/g,
		(match, offset: number, string: string) => {
			return offset === string.indexOf(",") ? match : "";
		},
	);

	// Limit to two decimal places after the comma
	const twoDecimalPlaces = singleComma.replace(/,(\d\d)\d+/g, ",$1");

	return twoDecimalPlaces;
}

export function formatCurrency(value: string): string {
	const baseFormatResult = baseFormat(value);

	// Add a dot as a thousand separator
	const formattedValue = baseFormatResult.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	return formattedValue;
}

export function formatPercentage(value: string): string {
	const baseFormatRusult = baseFormat(value);
	return baseFormatRusult;
}
