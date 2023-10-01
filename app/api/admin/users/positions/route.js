import { loadPositions } from "helpers/admin/user";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
	const token = await getToken({ req });

	if (token.user.position !== "it") {
		return new Response("Not Authorized", { status: 401 });
	}

	let positions = await loadPositions();

	if (positions) {
		return NextResponse.json(positions);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
