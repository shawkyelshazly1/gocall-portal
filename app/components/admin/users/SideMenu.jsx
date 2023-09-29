import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SideMenu() {
	return (
		<div className="hidden lg:flex flex-col bg-slate-100  md:w-1/4 xl:w-1/5 p-4 gap-3">
			<h1 className="font-medium text-xl text-slate-500 mb-4">USERS</h1>
			<input
				type="text"
				className="w-full rounded-lg py-2 px-4 outline-none focus:border-[1px] border-primary"
				placeholder={` 🔍 Search for a name or email`}
				name="search"
			/>
		</div>
	);
}
