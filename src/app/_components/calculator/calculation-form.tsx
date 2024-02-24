"use client";
import { calculationSchema } from "@/app/_components/calculator/schema";
import { type ParamFormatterFunctions } from "@/app/_components/calculator/types";
import {
	oneToThirtyArray,
	parseNumber,
} from "@/app/_components/calculator/utils";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/_components/shared/form";
import FormSelect from "@/app/_components/shared/form-select";
import { useRepaymentDetails } from "@/app/_components/shared/stores/repayment-plan-store";
import {
	formatCurrency,
	formatPercentage,
} from "@/app/_components/shared/utils/format-number-input";
import {
	type CalculationFormKeys,
	type CalculationSchema,
} from "@/shared/types/calculation";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

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
			interestPeriod: "0",
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

	// replace query params with form values
	useEffect(() => {
		const query = new URLSearchParams(watcher).toString();
		router.replace(`/?${query}`);
	}, [router, watcher]);

	// replace form values with query params
	useEffect(() => {
		const queryParams = new URLSearchParams(searchParams.toString());

		const paramFormatters: ParamFormatterFunctions = {
			loanAmount: formatCurrency,
			interestRate: formatPercentage,
			initialRepaymentRate: formatPercentage,
			interestPeriod: (value: string) => value,
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

	// watch form values and trigger validation
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
			sx={{
				width: "100%",
			}}
		>
			<Form {...form}>
				<Box
					component="form"
					display="flex"
					flexDirection="column"
					gap="2rem"
					onSubmit={form.handleSubmit(onSubmit)}
					sx={{
						padding: {
							xs: "1rem",
							md: "2rem",
						},
						width: {
							xs: "100%",
							md: "100%",
						},
						alignItems: "center",
						borderRadius: "1rem",
						borderColor: "secondary.main",
						border: "1px solid",
					}}
				>
					<FormField
						control={form.control}
						name="loanAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Darlehensbetrag</FormLabel>
								<FormControl>
									<Input
										sx={{ width: "100%" }}
										error={!!form.formState.errors.loanAmount}
										startAdornment={
											<InputAdornment position="start">€</InputAdornment>
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
						)}
					/>
					<FormField
						control={form.control}
						name="interestRate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sollzinssatz</FormLabel>
								<FormControl>
									<Input
										sx={{ width: "100%" }}
										error={!!form.formState.errors.interestRate}
										startAdornment={
											<InputAdornment position="start">%</InputAdornment>
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
								<FormLabel>Anfängliche Tilgung</FormLabel>
								<FormControl>
									<Input
										sx={{ width: "100%" }}
										error={!!form.formState.errors.initialRepaymentRate}
										autoComplete="off"
										startAdornment={
											<InputAdornment position="start">%</InputAdornment>
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
						name="interestPeriod"
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
										resetValue={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" variant="outlined" color="primary">
						Berechnen
					</Button>
				</Box>
			</Form>
		</Box>
	);
};

export default CalculationForm;
