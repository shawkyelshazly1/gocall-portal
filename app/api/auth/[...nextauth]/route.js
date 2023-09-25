import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { loginUser } from "helpers/user";

export const authOptions = {
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
					throw new Error("Invalid credentials");
				}

				const user = await loginUser(
					credentials.username,
					credentials.password
				);

				if (!user) {
					throw new Error("Incorrect Username");
				}

				

				if (!(await bcryptjs.compare(credentials.password, user.password))) {
					throw new Error("Wrong Password");
				}

				return user;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				console.log(user);
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			const { password, ...user } = token.user;
			session.user = user;
			return session;
		},
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
