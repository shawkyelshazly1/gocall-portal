import { loadVacationRequests } from "helpers/vacation";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const id = params.id;

	let requests = await loadVacationRequests(parseInt(id));

	if (requests) {
		return NextResponse.json(requests);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
