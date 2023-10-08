import { getUsersCount } from "@/helpers/admin/user";
import { loadVacationRequestsCount } from "@/helpers/vacation";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
	const token = await getToken({ req });
	if (!token?.user) {
		return new Response("Not Authorized", { status: 401 });
	}

	let requestsCount = await loadVacationRequestsCount(token?.user.id);

	if (requestsCount) {
		return NextResponse.json(requestsCount);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
