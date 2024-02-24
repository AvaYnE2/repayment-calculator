import { calculateRepaymentPlan } from "@/server/calculation/repayment-plan";
import { DateTime } from "luxon";
import { describe, expect, test } from "vitest";

const mockResult = [
	{
		year: DateTime.now().year.toString(),
		rate: "8.333,30",
		interestPortion: "4.135,27",
		repaymentPortion: "4.198,03",
		remainingDebt: "245.801,97",
	},
	{
		year: DateTime.now().plus({ years: 1 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.869,19",
		repaymentPortion: "5.130,77",
		remainingDebt: "240.671,20",
	},
	{
		year: DateTime.now().plus({ years: 2 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.765,61",
		repaymentPortion: "5.234,35",
		remainingDebt: "235.436,85",
	},
	{
		year: DateTime.now().plus({ years: 3 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.659,96",
		repaymentPortion: "5.340,00",
		remainingDebt: "230.096,85",
	},
	{
		year: DateTime.now().plus({ years: 4 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.552,17",
		repaymentPortion: "5.447,79",
		remainingDebt: "224.649,06",
	},
	{
		year: DateTime.now().plus({ years: 5 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.442,23",
		repaymentPortion: "5.557,73",
		remainingDebt: "219.091,33",
	},
	{
		year: DateTime.now().plus({ years: 6 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.330,03",
		repaymentPortion: "5.669,93",
		remainingDebt: "213.421,40",
	},
	{
		year: DateTime.now().plus({ years: 7 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.215,60",
		repaymentPortion: "5.784,36",
		remainingDebt: "207.637,04",
	},
	{
		year: DateTime.now().plus({ years: 8 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "4.098,85",
		repaymentPortion: "5.901,11",
		remainingDebt: "201.735,93",
	},
	{
		year: DateTime.now().plus({ years: 9 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.979,74",
		repaymentPortion: "6.020,22",
		remainingDebt: "195.715,71",
	},
	{
		year: DateTime.now().plus({ years: 10 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.858,21",
		repaymentPortion: "6.141,75",
		remainingDebt: "189.573,96",
	},
	{
		year: DateTime.now().plus({ years: 11 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.734,25",
		repaymentPortion: "6.265,71",
		remainingDebt: "183.308,25",
	},
	{
		year: DateTime.now().plus({ years: 12 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.607,78",
		repaymentPortion: "6.392,18",
		remainingDebt: "176.916,07",
	},
	{
		year: DateTime.now().plus({ years: 13 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.478,76",
		repaymentPortion: "6.521,20",
		remainingDebt: "170.394,87",
	},
	{
		year: DateTime.now().plus({ years: 14 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.347,15",
		repaymentPortion: "6.652,81",
		remainingDebt: "163.742,06",
	},
	{
		year: DateTime.now().plus({ years: 15 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.212,85",
		repaymentPortion: "6.787,11",
		remainingDebt: "156.954,95",
	},
	{
		year: DateTime.now().plus({ years: 16 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "3.075,85",
		repaymentPortion: "6.924,11",
		remainingDebt: "150.030,84",
	},
	{
		year: DateTime.now().plus({ years: 17 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "2.936,09",
		repaymentPortion: "7.063,87",
		remainingDebt: "142.966,97",
	},
	{
		year: DateTime.now().plus({ years: 18 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "2.793,52",
		repaymentPortion: "7.206,44",
		remainingDebt: "135.760,53",
	},
	{
		year: DateTime.now().plus({ years: 19 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "2.648,06",
		repaymentPortion: "7.351,90",
		remainingDebt: "128.408,63",
	},
	{
		year: DateTime.now().plus({ years: 20 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "2.499,67",
		repaymentPortion: "7.500,29",
		remainingDebt: "120.908,34",
	},
	{
		year: DateTime.now().plus({ years: 21 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "2.348,27",
		repaymentPortion: "7.651,69",
		remainingDebt: "113.256,65",
	},
	{
		year: DateTime.now().plus({ years: 22 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "2.193,84",
		repaymentPortion: "7.806,12",
		remainingDebt: "105.450,53",
	},
	{
		year: DateTime.now().plus({ years: 23 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "2.036,27",
		repaymentPortion: "7.963,69",
		remainingDebt: "97.486,84",
	},
	{
		year: DateTime.now().plus({ years: 24 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "1.875,53",
		repaymentPortion: "8.124,43",
		remainingDebt: "89.362,41",
	},
	{
		year: DateTime.now().plus({ years: 25 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "1.711,54",
		repaymentPortion: "8.288,42",
		remainingDebt: "81.073,99",
	},
	{
		year: DateTime.now().plus({ years: 26 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "1.544,26",
		repaymentPortion: "8.455,70",
		remainingDebt: "72.618,29",
	},
	{
		year: DateTime.now().plus({ years: 27 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "1.373,56",
		repaymentPortion: "8.626,40",
		remainingDebt: "63.991,89",
	},
	{
		year: DateTime.now().plus({ years: 28 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "1.199,46",
		repaymentPortion: "8.800,50",
		remainingDebt: "55.191,39",
	},
	{
		year: DateTime.now().plus({ years: 29 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "1.021,82",
		repaymentPortion: "8.978,14",
		remainingDebt: "46.213,25",
	},
	{
		year: DateTime.now().plus({ years: 30 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "840,60",
		repaymentPortion: "9.159,36",
		remainingDebt: "37.053,89",
	},
	{
		year: DateTime.now().plus({ years: 31 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "655,74",
		repaymentPortion: "9.344,22",
		remainingDebt: "27.709,67",
	},
	{
		year: DateTime.now().plus({ years: 32 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "467,12",
		repaymentPortion: "9.532,84",
		remainingDebt: "18.176,83",
	},
	{
		year: DateTime.now().plus({ years: 33 }).year.toString(),
		rate: "9.999,96",
		interestPortion: "274,71",
		repaymentPortion: "9.725,25",
		remainingDebt: "8.451,58",
	},
	{
		year: DateTime.now().plus({ years: 34 }).year.toString(),
		rate: "8.531,06",
		interestPortion: "79,48",
		repaymentPortion: "8.451,58",
		remainingDebt: "0,00",
	},
];
describe("Calculate Repayment Plan Test", () => {
	test("should correctly calculate the repayment plan", () => {
		const loanAmount = 250_000;
		const interestRateDezimal = 0.02;
		const monthlyRate = 833.33;
		const result = calculateRepaymentPlan(
			loanAmount,
			interestRateDezimal,
			monthlyRate,
		);

		expect(result).toEqual(mockResult);
	});
});
