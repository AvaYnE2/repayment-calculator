import { type CalculationResponse } from "@/shared/types/calculation";
import { create } from "zustand";

interface repaymentPlanState {
	details: CalculationResponse;
	setDetails: (data: CalculationResponse) => void;
}

export const useRepaymentDetails = create<repaymentPlanState>((set) => ({
	details: {
		monthlyRate: 0,
		repaymentPlan: [],
	},
	setDetails: (data) => set({ details: data }),
}));
