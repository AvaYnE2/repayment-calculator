import CalculationForm from "@/app/_components/calculator/calculation-form";
import RepaymentDetails from "@/app/_components/repayment/details/component";
import RepaymentTable from "@/app/_components/repayment/table/component";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
	noStore();

	return (
		<main>
			<Box
				flexDirection="column"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "start",
					gap: "2rem",
				}}
			>
				<Box width="100%" display="flex" justifyContent="center">
					<CalculationForm />
				</Box>
				<Box>
					<Typography variant="h2" sx={{ fontSize: "26px" }}>
						Ergebnis
					</Typography>
					<RepaymentDetails />
					<RepaymentTable />
				</Box>
			</Box>
		</main>
	);
}
