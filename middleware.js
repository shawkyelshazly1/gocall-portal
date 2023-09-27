import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	// getting token to middleware
	async function middleware(req) {
		const token = await getToken({ req });
		const isAuthenticated = !!token;

		// login page and not authenticated
		if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	},
	{
		pages: {
			signIn: "/login",
		},
	}
);
