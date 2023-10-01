import { loadDepartmentPeople } from "helpers/admin/user";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const token = await getToken({ req });

	let id = params.id;

	if (token.user.position !== "it") {
		return new Response("Not Authorized", { status: 401 });
	}

	let managers = await loadDepartmentPeople(parseInt(id));

	if (managers) {
		return NextResponse.json(managers);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
