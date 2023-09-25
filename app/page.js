import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
	const data = await getServerSession(authOptions);

	if (!data) {
		redirect("/api/auth/signin");
	}

	return (
		<main className="flex flex-col font-black text-3xl container py-6 ">
			Welcome
		</main>
	);
}
