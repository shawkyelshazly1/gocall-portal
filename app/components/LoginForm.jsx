"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
	const router = useRouter();

	const handleFormSubmission = (e) => {
		e.preventDefault();

		let formData = Object.fromEntries(new FormData(e.target).entries());
		signIn("credentials", {
			...formData,
			redirect: false,
			callbackUrl: "/",
		}).then((res) => {
			if (res?.error) {
				toast.error(res.error);
				return;
			} else {
				toast.success("Logged In");
				router.push("/");
			}
		});
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
				Login
			</button>
		</form>
	);
}
