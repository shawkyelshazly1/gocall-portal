import { getUsersCount } from "helpers/admin/user";
import { NextResponse } from "next/server";

export async function GET(req) {
	let usersCount = await getUsersCount();

	if (usersCount) {
		return NextResponse.json(usersCount);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
