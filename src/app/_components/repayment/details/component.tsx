"use client";
import { useRepaymentDetails } from "@/app/_components/shared/stores/repayment-plan-store";
import { Typography } from "@mui/material";
import React from "react";

const RepaymentDetails: React.FC = () => {
	const { details } = useRepaymentDetails();
	return (
		<>
			<Typography variant="h2" sx={{ fontSize: "22px" }}>
				Details
			</Typography>
			<Typography>Monatliche Rate: {details.monthlyRate} €</Typography>
		</>
	);
};

export default RepaymentDetails;
