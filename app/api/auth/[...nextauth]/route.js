import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/helpers/auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/index";

export const authOptions = {
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
	adaptr: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "Username" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				if (!credentials || !credentials.username || !credentials.password) {
					throw new Error("Invalid Credentials");
				}

				const employee = await loginUser(
					credentials.username,
					credentials.password
				);

				if (employee) {
					return Promise.resolve(employee);
				} else {
					throw new Error("Invalid username or password.");
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user && !user.error) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
