import React from "react";

export default function VacationBalanceInfo() {
	const vacationTypes = ["Annual", "Casual", "Sick", "Business Trip"];

	return (
		<div className="flex flex-row justify-between gap-12">
			{vacationTypes.map((vacationType, idx) => (
				<div
					className="flex flex-col items-center bg-slate-200 py-4 gap-3 rounded-lg w-full"
					key={idx}
				>
					<h1 className="text-xl font-medium text-gray-500">{vacationType}</h1>
					<h1 className="text-4xl font-medium text-black">10</h1>
				</div>
			))}
		</div>
	);
}
