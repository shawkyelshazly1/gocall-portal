import React from "react";
import VacationRequestsTable from "./VacationRequestsTable";
import ExportDataButton from "./ExportDataButton";

export default function VacationRequestsHistory() {
	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="flex flex-col-reverse md:flex-row justify-between">
				<h1 className="text-3xl font-medium italic text-gray-500">
					Requests History
				</h1>
				<div className="self-end ">
					<ExportDataButton />
				</div>
			</div>

			<VacationRequestsTable />
		</div>
	);
}
