import UsersTable from "@components/admin/users/UsersTable";
import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default function Page() {
	return (
		<div className="w-full  flex container gap-4">
			<div className="flex flex-col h-full w-full py-4 gap-4">
				<div className="flex flex-row gap-1 self-end">
					<button className=" bg-primary text-white py-2 px-4 rounded-xl font-semibold">
						NEW USER
					</button>
					<button className=" bg-secondary text-white py-2 px-4 rounded-xl font-semibold">
						ADD BULK
					</button>
				</div>
				<Suspense fallback={<ClipLoader color="#1770b8" size={40} />}>
					<UsersTable />
				</Suspense>
			</div>
		</div>
	);
}
