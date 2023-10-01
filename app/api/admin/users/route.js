import { authOptions } from "api/auth/[...nextauth]/route";
import { loadUsers } from "helpers/admin/user";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
	const token = await getToken({ req });

	if (token.user.position !== "it") {
		return new Response("Not Authorized", { status: 401 });
	}

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