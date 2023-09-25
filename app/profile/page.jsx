import DetailsCard from "@components/profile/DetailsCard";
import { authOptions } from "api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

export default async function Page() {
	const { user } = await getServerSession(authOptions);

	console.log(user);

	return (
		<div className="w-full h-full container grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-20  py-6">
			<div className="flex flex-col">
				{" "}
				<Image
					src={"/profile_image.png"}
					className="rounded-full border-[4px] border-[#fbb919]"
					width={250}
					height={250}
					alt="profile_image"
				/>
				<div className="flex flex-col gap-4 mt-12">
					<h1 className="font-medium text-xl text-slate-400">
						Employee Details
					</h1>
					<DetailsCard title={"First Name"} value={user.firstName} />
					<DetailsCard title={"Last Name"} value={user.firstName} />
					<DetailsCard title={"Email Address"} value={user.email} />
					<DetailsCard title={"Phone Number"} value={"+201110276945"} />
					<DetailsCard title={"Position"} value={user.position} />
				</div>
			</div>
			<div className="flex flex-col ">
				<div className="flex flex-col gap-4">
					<h1 className="font-medium text-xl text-slate-400">Role</h1>
					<DetailsCard title={"Role"} value={"Operations Manager"} />
				</div>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-col gap-4">
					<h1 className="font-medium text-xl text-slate-400">Team</h1>
					<DetailsCard title={"HR"} value={"Nadine Mohamed"} />
					<DetailsCard title={"HR"} value={"Nadine Mohamed"} />
					<DetailsCard title={"HR"} value={"Nadine Mohamed"} />
					<DetailsCard title={"HR"} value={"Nadine Mohamed"} />
				</div>
			</div>
		</div>
	);
}
