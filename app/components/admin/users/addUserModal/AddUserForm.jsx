"use client";

import { Autocomplete, TextField, FormControl } from "@mui/material";
import { useState } from "react";
import DepartmentAutoComplete from "./formComponents/DepartmentAutoComplete";
import ManagerAutoComplete from "./formComponents/ManagerAutoComplete";
import PositionAutoComplete from "./formComponents/PositionAutoComplete";

export default function AddUserForm({ closeModal, openModal }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		departmentId: "",
		position: "",
	});

	const handleFormSubmission = (e) => {
		e.preventDefault();
	};

	const handleFieldChange = (field) => {
		setFormData({ ...formData, [field.name]: field.value });
	};

	return (
		<form
			onSubmit={handleFormSubmission}
			className="flex flex-col gap-4 w-full"
		>
			<div className="flex flex-col lg:w-full items-center lg:flex-row gap-2 mt-4">
				<TextField
					required
					id="firstName"
					label="First Name"
					variant="outlined"
					className="w-full"
					name="firstName"
					onChange={(e) => {
						handleFieldChange({ name: e.target.name, value: e.target.value });
					}}
				/>
				<TextField
					required
					id="lastName"
					label="Last Name"
					variant="outlined"
					name="lastName"
					className="w-full"
					onChange={(e) => {
						handleFieldChange({ name: e.target.name, value: e.target.value });
					}}
				/>
			</div>
			<FormControl>
				<TextField
					required
					id="email"
					label="Email"
					type="email"
					variant="outlined"
					name="email"
					className="w-full"
					onChange={(e) => {
						handleFieldChange({ name: e.target.name, value: e.target.value });
					}}
				/>
			</FormControl>
			<DepartmentAutoComplete handleFieldChange={handleFieldChange} />
			<FormControl className="flex flex-col  lg:flex-row gap-2">
				<ManagerAutoComplete
					handleFieldChange={handleFieldChange}
					departmentId={formData.departmentId}
				/>
				<PositionAutoComplete handleFieldChange={handleFieldChange} />
			</FormControl>

			<div className="flex flex-row gap-3 items-center self-center">
				<button
					type="submit"
					className="py-2 px-3 rounded-lg bg-green-400 text-white font-semibold text-xl"
				>
					Submit
				</button>
				<button
					type="reset"
					onClick={() => {
						closeModal();
						var delayInMilliseconds = 250; //1 second

						setTimeout(function () {
							openModal();
						}, delayInMilliseconds);
					}}
					className="py-2 px-5 rounded-lg bg-red-400 text-white font-semibold text-xl"
				>
					Reset
				</button>
			</div>
		</form>
	);
}