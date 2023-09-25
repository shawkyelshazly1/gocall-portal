import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	// getting token to middleware
	function middleware(req) {
		if (
			req.nextUrl.pathname === "/vacation/manage" &&
			req.nextauth.token?.user?.position !== "supervisor"
		) {
			return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/vacation`);
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export const config = { matcher: ["/vacation/manage"] };
