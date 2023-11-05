import EmployeesSection from "@/components/hr/employees/EmployeesSection";
import FilterPane from "@/components/hr/employees/FilterPane";
import { searchEmployees } from "@/helpers/hr/employee";
import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default async function Page({ searchParams }) {
	let employees = await searchEmployees(searchParams);
	return (
		<div className="w-full flex container gap-4">
			<div className="flex flex-col h-full w-full py-4 gap-4 container items-center">
				<div className="flex flex-col w-full container justify-between fixed gap-4 bg-white mt-[-16px] py-4 px-6">
					<h1 className="text-2xl text-gray-400 font-semibold italic">
						EMPLOYEES
					</h1>
					<FilterPane searchParams={searchParams} />
					<hr />
				</div>

				<Suspense fallback={<ClipLoader color="#1770b8" size={40} />}>
					<EmployeesSection employees={employees} />
				</Suspense>
			</div>
		</div>
	);
}
