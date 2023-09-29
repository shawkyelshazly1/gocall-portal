import { loadUsers } from "helpers/admin/user";
import { NextResponse } from "next/server";

export async function GET(req) {
	let users = await loadUsers(
		parseInt(req.nextUrl.searchParams.get(["skip"])),
		parseInt(req.nextUrl.searchParams.get(["take"]))
	);

	if (users) {
		return NextResponse.json(users);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
