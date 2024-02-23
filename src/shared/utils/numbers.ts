export const formatNumber = (number: number) => {
	const formatter = new Intl.NumberFormat("de-DE", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(number);
};

export function round(value: number) {
	return Math.round(value * 100) / 100;
}