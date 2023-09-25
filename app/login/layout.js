import AuthProvider from "@components/AuthProvider";
import { authOptions } from "api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import login_bg from "../../public/login-bg.svg";
export default async function RootLayout({ children }) {
	// const data = await getServerSession(authOptions);

	// if (data?.user) {
	// 	redirect("/");
	// }

	return (
		<AuthProvider>
			<div
				className="flex w-full h-screen justify-center items-center"
				style={{ backgroundImage: `url(${login_bg.src})` }}
			>
				{children}
			</div>
		</AuthProvider>
	);
}
