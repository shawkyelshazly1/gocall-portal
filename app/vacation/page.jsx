import HistoryTable from "@components/vacation/HistoryTable";
import RequestVacationDialog from "@components/vacation/RequestVacationDialog";
import VacationBalanceInfo from "@components/vacation/VacationBalanceInfo";
import React from "react";

export default function Page() {
	return (
		<div className="w-full h-full flex flex-col container mt-6 gap-12">
			<div className="flex flex-row gap-6 self-end w-fit">
				<RequestVacationDialog />
				{/* <button className="rounded-3xl py-2 text-xl px-4 bg-green-500 text-white font-medium flex flex-row items-center gap-3">
					Export History <FaFileExport />
				</button> */}
			</div>
			<VacationBalanceInfo />

			<HistoryTable />
		</div>
	);
}
