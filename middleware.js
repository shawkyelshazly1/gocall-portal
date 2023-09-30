import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse, userAgent } from "next/server";

export default withAuth(
	// getting token to middleware
	async function middleware(req) {
		const token = await getToken({ req });
		const isAuthenticated = !!token;

		// login page and not authenticated
		if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
			return NextResponse.redirect(new URL("/", req.url));
		}

		// protect admin pages
		if (
			req.nextUrl.pathname.startsWith("/admin") &&
			token.user.position !== "it"
		) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	},
	{
		pages: {
			signIn: "/login",
		},
	}
);
