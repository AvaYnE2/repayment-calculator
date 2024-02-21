"use client";
import { useRepaymentDetails } from "@/app/_components/shared/stores/repayment-plan-store";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

const RepaymentTable: React.FC = () => {
	const { details } = useRepaymentDetails();

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="payment-plan-table">
				<TableHead>
					<TableRow>
						<TableCell>Jahr</TableCell>
						<TableCell align="right">Rate</TableCell>
						<TableCell align="right">Zinsanteil</TableCell>
						<TableCell align="right">Tilgungsanteil</TableCell>
						<TableCell align="right">Restschuld</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{details.repaymentPlan.map((row) => (
						<TableRow
							key={row.year}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.year}
							</TableCell>
							<TableCell align="right">{row.rate} €</TableCell>
							<TableCell align="right">{row.interestPortion} €</TableCell>
							<TableCell align="right">{row.repaymentPortion} €</TableCell>
							<TableCell align="right">{row.remainingDebt} €</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default RepaymentTable;
