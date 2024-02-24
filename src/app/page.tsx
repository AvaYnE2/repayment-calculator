import CalculationForm from "@/app/_components/calculator/calculation-form";
import RepaymentDetails from "@/app/_components/repayment/details/component";
import RepaymentTable from "@/app/_components/repayment/table/component";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
	noStore();

	return (
		<main>
			<Container>
				<Box
					sx={{
						flexDirection: {
							xs: "column",
							md: "row-reverse",
						},
						justifyContent: {
							xs: "center",
							md: "space-evenly",
						},
						gap: {
							xs: "1rem",
						},
						width: "100%",
						display: "flex",
						padding: "1rem",
					}}
				>
					<RepaymentDetails />
					<CalculationForm />
				</Box>
				<Box>
					<RepaymentTable />
				</Box>
			</Container>
		</main>
	);
}
