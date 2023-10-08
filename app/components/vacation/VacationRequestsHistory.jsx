import React from "react";
import VacationRequestsTable from "./VacationRequestsTable";

export default function VacationRequestsHistory() {
	return (
		<div className="flex flex-col gap-6 w-full">
			<h1 className="text-3xl font-medium italic text-gray-500">
				Requests History
			</h1>
			<VacationRequestsTable />
		</div>
	);
}
