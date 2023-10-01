"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function LoginForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const callbackUrl = useSearchParams().get("callbackUrl");

	const handleFormSubmission = async (e) => {
		e.preventDefault();

		let formData = Object.fromEntries(new FormData(e.target).entries());

		formData = { ...formData, username: formData.username.toLowerCase() };
		setLoading(true);
		let result = await signIn("credentials", {
			...formData,
			redirect: false,
		});

		if (result.error) {
			setLoading(false);
			toast.error(result.error);
		} else {
			setLoading(false);
			toast.success("Logged In.");
			router.push(callbackUrl);
		}
	};

	return (
		<form
			onSubmit={handleFormSubmission}
			className="flex flex-col gap-2 w-[22em] min-h-[26em] items-center justify-center bg-white py-6   px-8 rounded-3xl "
		>
			<div className="flex flex-col gap-6 mb-10 items-center mt-4">
				<Image src={"/logo.png"} width={260} height={260} alt="go-call-logo" />
				<p className="text-[#fcbb1b] font-medium text-lg">Employee Portal</p>
			</div>

			<input
				type="text"
				placeholder="Username"
				name="username"
				className="py-2 px-4 text-lg rounded-3xl outline-none border-[1px] w-full focus:border-[#fcbb1b]"
				required
			/>
			<input
				type="password"
				placeholder="Password"
				name="password"
				className="py-2 px-4 text-lg rounded-3xl outline-none border-[1px] w-full focus:border-[#fcbb1b]"
				required
			/>
			<button className="rounded-3xl bg-[#1770b8] text-white text-xl font-semibold py-2 w-full mt-4">
				{loading ? (
					<ClipLoader color="#FFF" className="block m-auto" size={20} />
				) : (
					"Login"
				)}
			</button>
		</form>
	);
}
