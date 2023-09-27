import RequestVacationDialog from "@components/vacation/RequestVacationDialog";
import VacationBalanceInfo from "@components/vacation/VacationBalanceInfo";
import { authOptions } from "api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { ClipLoader } from "react-spinners";

async function getData(userId) {
	let res = await fetch(`${process.env.URL}/api/vacation/load/${userId}`, {
		method: "GET",
	});

	if (!res.ok) {
		throw new Error("Something went wrong!");
	}

	return res.json();
}

export default async function Page() {
	const { user } = await getServerSession(authOptions);

	let userRequests = getData(user?.id);

	return (
		<div className="w-full h-full flex flex-col container mt-6 gap-12">
			<div className="flex flex-row gap-6 self-end w-fit">
				<RequestVacationDialog />
			</div>
			<VacationBalanceInfo />
			<Suspense
				fallback={
					<ClipLoader color="blue" className="block m-auto" size={20} />
				}
			></Suspense>
		</div>
	);
}
