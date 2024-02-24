"use client";
import { useRepaymentDetails } from "@/app/_components/shared/stores/repayment-plan-store";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Divider, Typography } from "@mui/material";
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
				minWidth: "20rem",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}
		>
			{details.monthlyRate ? <ResultBody details={details} /> : <NoDataBody />}
		</Box>
	);
};

interface DetailsBodyProps<T> {
	details: T;
}

const ResultBody = <
	T extends { monthlyRate: string; remainingDebt: string | null },
>({
	details,
}: DetailsBodyProps<T>) => {
	return (
		<>
			<Typography variant="h5" sx={{ textAlign: "center" }}>
				Ergebnis
			</Typography>
			<Typography component="div" display="flex" gap={2}>
				<CurrencyExchangeIcon fontSize="small" sx={{}} />
				<Typography sx={{ fontSize: "16px" }}>
					Monatliche Rate: {details.monthlyRate} €
				</Typography>
			</Typography>
			{details.remainingDebt && (
				<>
					<Divider variant="middle" />
					<Typography component="div" display="flex" gap={2}>
						<AttachMoneyIcon fontSize="small" sx={{}} />
						<Typography sx={{ fontSize: "16px" }}>
							Restschuld am Ende der Zinsbindung : {details.remainingDebt} €
						</Typography>
					</Typography>
				</>
			)}
		</>
	);
};

const NoDataBody: React.FC = () => {
	return (
		<>
			<Typography variant="h5" sx={{ textAlign: "center" }}>
				Keine Daten
			</Typography>
			<Typography
				sx={{ textAlign: "center", fontSize: "14px", color: "text.secondary" }}
			>
				Bitte geben Sie die benötigten Daten ein und klicken Sie auf
				&quot;Berechnen&quot;
			</Typography>
		</>
	);
};

export default RepaymentDetails;
