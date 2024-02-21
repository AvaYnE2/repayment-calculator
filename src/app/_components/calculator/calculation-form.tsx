"use client";
import { formSchema } from "@/app/_components/calculator/schema";
import { oneToThirtyArray } from "@/app/_components/calculator/utils";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/_components/shared/form";
import FormSelect from "@/app/_components/shared/form-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CalculationForm: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			loanAmount: "",
			interestRate: "",
			initialRepaymentRate: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		console.log(data);
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			flexDirection="column"
			alignItems="center"
		>
			<Typography variant="h2">Form</Typography>
			<Form {...form}>
				<Box
					component="form"
					display="flex"
					flexDirection="column"
					gap="2rem"
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
									{/*<Input*/}
									{/*	error={!!form.formState.errors.zinsbindungsdauer}*/}
									{/*	endAdornment={*/}
									{/*		<InputAdornment position="end">Jahre</InputAdornment>*/}
									{/*	}*/}
									{/*	{...field}*/}
									{/*/>*/}

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
						Submit
					</Button>
				</Box>
			</Form>
		</Box>
	);
};

export default CalculationForm;
