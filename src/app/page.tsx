import CalculationForm from "@/app/_components/calculator/calculation-form";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
	noStore();

	return (
		<main>
			<CalculationForm />
		</main>
	);
}
