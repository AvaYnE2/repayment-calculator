"use client";
import { useRepaymentDetails } from "@/app/_components/shared/stores/repayment-plan-store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const RepaymentDetails: React.FC = () => {
	const { details } = useRepaymentDetails();
	return (
		<Box
			sx={{
				padding: "1rem",
				borderRadius: "1rem",
				border: "1px solid",
				minWidth: "22rem",
			}}
		>
			<Typography component="div" display="flex" gap={2}>
				<CurrencyExchangeIcon fontSize="small" sx={{}} />
				<Typography sx={{ fontSize: "16px" }}>
					Monatliche Rate: {details.monthlyRate} €
				</Typography>
			</Typography>
			{details.remainingDebt && (
				<Typography component="div" display="flex" gap={2}>
					<AttachMoneyIcon fontSize="small" sx={{}} />
					<Typography sx={{ fontSize: "16px" }}>
						Restschuld am Ende der Zinsbindung : {details.remainingDebt} €
					</Typography>
				</Typography>
			)}
		</Box>
	);
};

export default RepaymentDetails;
