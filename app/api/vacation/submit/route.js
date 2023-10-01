import { submitVacationRequest } from "@/helpers/vacation";
import { NextResponse } from "next/server";

export async function POST(req) {
	let body = await req.json();

	let newRequest = await submitVacationRequest(body);

	if (newRequest) {
		return NextResponse.json(newRequest);
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
