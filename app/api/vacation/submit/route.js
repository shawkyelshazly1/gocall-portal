import { submitVacationRequest } from "helpers/vacation";

export async function POST(req) {
	let body = await req.json();

	let newRequest = await submitVacationRequest(body);

	if (newRequest) {
		return new Response("Request Submitted", { status: 200 });
	} else {
		return new Response("Something went wrong!", { status: 422 });
	}
}
