"use client";
import {calculationSchema} from "@/app/_components/calculator/schema";
import {type ParamFormatterFunctions} from "@/app/_components/calculator/types";
import {oneToThirtyArray, parseNumber,} from "@/app/_components/calculator/utils";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/app/_components/shared/form";
import FormSelect from "@/app/_components/shared/form-select";
import {useRepaymentDetails} from "@/app/_components/shared/stores/repayment-plan-store";
import {formatCurrency, formatPercentage,} from "@/app/_components/shared/utils/format-number-input";
import {type CalculationFormKeys, type CalculationSchema,} from "@/shared/types/calculation";
import {api} from "@/trpc/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Input, InputAdornment, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {useForm, useWatch} from "react-hook-form";

const CalculationForm: React.FC = () => {
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const router = useRouter();
	const { setDetails } = useRepaymentDetails();
	const applyCalculation = api.calculation.calculateRepayment.useMutation({
		onSuccess: (calculatedData) => {
			router.refresh();
			setDetails(calculatedData);
			setHasSubmitted(true);
		},
	});
	const form = useForm<CalculationSchema>({
		resolver: zodResolver(calculationSchema),
		defaultValues: {
			loanAmount: formatCurrency("250000"),
			interestRate: formatPercentage("2"),
			initialRepaymentRate: formatPercentage("2"),
			fixedInterestPeriod: "1",
		},
	});

	const onSubmit = useCallback(
		async (data: CalculationSchema) => {
			const parsedData = parseNumber(data);
			applyCalculation.mutate(parsedData);
		},
		[applyCalculation],
	);

	const searchParams = useSearchParams();
	const watcher = useWatch({
		control: form.control,
	});

	useEffect(() => {
		const query = new URLSearchParams(watcher).toString();
		router.replace(`/?${query}`);
	}, [router, watcher]);

	useEffect(() => {
		const queryParams = new URLSearchParams(searchParams.toString());

		const paramFormatters: ParamFormatterFunctions = {
			loanAmount: formatCurrency,
			interestRate: formatPercentage,
			initialRepaymentRate: formatPercentage,
			fixedInterestPeriod: (value: string) => value,
		};

		queryParams.forEach((value, key) => {
			if (key in form.getValues()) {
				const formatter = paramFormatters[key as CalculationFormKeys];
				if (formatter) {
					const formattedValue = formatter(value);
					form.setValue(key as CalculationFormKeys, formattedValue);
				}
			}
		});
	}, [form, searchParams]);

	useEffect(() => {
		if (hasSubmitted) {
			const subscription = form.watch((data) => {
				void (async () => {
					const isValid = await form.trigger();

					if (isValid) {
						await onSubmit(data as CalculationSchema);
					}
				})();
			});

			return () => subscription.unsubscribe();
		}
	}, [form, hasSubmitted, onSubmit]);

	return (
		<Box
			display="flex"
			justifyContent="center"
			flexDirection="column"
			alignItems="center"
		>
			<Typography variant="h2" sx={{ fontSize: "26px" }}>
				Eingabe
			</Typography>
			<Form {...form}>
				<Box
					component="form"
					display="flex"
					flexDirection="column"
					gap="3rem"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="loanAmount"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FormItem maxWidth="16rem">
										<FormLabel>Darlehensbetrag*</FormLabel>
										<FormControl>
											<Input
												error={!!form.formState.errors.loanAmount}
												endAdornment={
													<InputAdornment position="end">€</InputAdornment>
												}
												autoComplete="off"
												{...field}
												onChange={(e) => {
													const { value } = e.target;

													// TODO: Cursor position is not correct when typing before the comma
													const formattedValue = formatCurrency(value);
													field.onChange(formattedValue);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="interestRate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sollzinssatz*</FormLabel>
								<FormControl>
									<Input
										error={!!form.formState.errors.interestRate}
										endAdornment={
											<InputAdornment position="end">%</InputAdornment>
										}
										autoComplete="off"
										{...field}
										onChange={(e) => {
											const { value } = e.target;

											const formattedValue = formatPercentage(value);
											field.onChange(formattedValue);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="initialRepaymentRate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Anfängliche Tilgung*</FormLabel>
								<FormControl>
									<Input
										error={!!form.formState.errors.initialRepaymentRate}
										autoComplete="off"
										endAdornment={
											<InputAdornment position="end">%</InputAdornment>
										}
										{...field}
										onChange={(e) => {
											const { value } = e.target;

											const formattedValue = formatPercentage(value);
											field.onChange(formattedValue);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="fixedInterestPeriod"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Zinsbindungsdauer</FormLabel>
								<FormControl>
									<FormSelect
										value={field.value ?? ""}
										onChange={(event: string) => field.onChange(event)}
										label="Zinsbindungsdauer"
										selectOptions={oneToThirtyArray}
										unit="Jahre"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/*TODO: Change styling because wrong styling gets applied to the button*/}
					<Button type="submit" color="primary">
						Berechnen
					</Button>
				</Box>
			</Form>
		</Box>
	);
};

export default CalculationForm;
