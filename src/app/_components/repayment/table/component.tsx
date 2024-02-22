import PlanTableBody from "@/app/_components/repayment/table/plan-table-body";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

const RepaymentTable: React.FC = () => {
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
				<PlanTableBody />
			</Table>
		</TableContainer>
	);
};

export default RepaymentTable;
