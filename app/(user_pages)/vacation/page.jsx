import RequestVacationDialog from "@/components/vacation/RequestVacationDialog";
import VacationBalanceInfo from "@/components/vacation/VacationBalanceInfo";
import VacationRequestsHistory from "@/components/vacation/VacationRequestsHistory";

export default function Page() {
	return (
		<div className="w-full container h-full flex flex-col gap-16 relative">
			
			<VacationBalanceInfo />

			<VacationRequestsHistory />
		</div>
	);
}
