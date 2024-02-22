"use client";
import { calculationSchema } from "@/app/_components/calculator/schema";
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
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const CalculationForm: React.FC = () => {
	const router = useRouter();
	const { setDetails } = useRepaymentDetails();
	const applyCalculation = api.calculation.calculateRepayment.useMutation({
		onSuccess: (calculatedData) => {
			router.refresh();
			setDetails(calculatedData);
		},
	});
	const form = useForm<z.infer<typeof calculationSchema>>({
		resolver: zodResolver(calculationSchema),
		defaultValues: {
			loanAmount: "250000",
			interestRate: "2",
			initialRepaymentRate: "2",
			fixedInterestPeriod: "10",
		},
	});

	const onSubmit = async (data: z.infer<typeof calculationSchema>) => {
		const parsedData = parseNumber(data);
		applyCalculation.mutate(parsedData);
	};

	// TODO: Implement save state in url here

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
									<FormItem>
										<FormLabel>Darlehensbetrag*</FormLabel>
										<FormControl>
											<Input
												error={!!form.formState.errors.loanAmount}
												endAdornment={
													<InputAdornment position="end">€</InputAdornment>
												}
												{...field}
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
										inputProps={{
											pattern: "[0-9]+",
										}}
										{...field}
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
										endAdornment={
											<InputAdornment position="end">%</InputAdornment>
										}
										{...field}
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
