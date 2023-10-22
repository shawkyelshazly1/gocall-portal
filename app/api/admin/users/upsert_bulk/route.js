import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
	const token = await getToken({ req });

	if (token.user.department.name !== "information_technology") {
		return new Response("Not Authorized", { status: 401 });
	}

	let body = await req.json();

	//TODO: upsert users here

	if (employeeInfo) {
		return NextResponse.json(employeeInfo);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
