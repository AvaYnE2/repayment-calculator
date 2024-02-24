import PlanTableBody from "@/app/_components/repayment/table/plan-table-body";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import React from "react";

const RepaymentTable: React.FC = () => {
	return (
		<TableContainer component={Box}>
			<Table
				sx={{
					minWidth: "100%",
					width: "100vw",
					// maxWidth: {
					// 	xs: "100vw",
					// 	md: "34rem",
					// },
				}}
				aria-label="payment-plan-table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Jahr</TableCell>
						<TableCell
							sx={{
								fontSize: {
									xs: "12px",
									md: "14px",
								},
							}}
							align="right"
						>
							Rate
						</TableCell>
						<TableCell
							sx={{
								fontSize: {
									xs: "12px",
									md: "14px",
								},
							}}
							align="right"
						>
							Zinsen
						</TableCell>
						<TableCell
							sx={{
								fontSize: {
									xs: "12px",
									md: "14px",
								},
							}}
							align="right"
						>
							Tilgung
						</TableCell>
						<TableCell
							sx={{
								fontSize: {
									xs: "12px",
									md: "14px",
								},
							}}
							align="right"
						>
							Restschuld
						</TableCell>
					</TableRow>
				</TableHead>
				<PlanTableBody />
			</Table>
		</TableContainer>
	);
};

export default RepaymentTable;
