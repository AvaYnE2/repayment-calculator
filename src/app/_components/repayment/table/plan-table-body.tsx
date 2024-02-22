"use client";
import { useRepaymentDetails } from "@/app/_components/shared/stores/repayment-plan-store";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";

const PlanTableBody: React.FC = () => {
	const { details } = useRepaymentDetails();

	return (
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
	);
};

export default PlanTableBody;
