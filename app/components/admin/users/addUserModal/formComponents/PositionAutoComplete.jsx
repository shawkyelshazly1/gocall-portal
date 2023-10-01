import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import S from "underscore.string";

export default function PositionAutoComplete({ handleFieldChange }) {
	const [positions, setPositions] = useState([]);

	// load positions
	useEffect(() => {
		async function loadPositions() {
			await fetch(`/api/admin/users/positions`, {
				method: "GET",
			})
				.then(async (res) => {
					return await res.json();
				})
				.then((data) => {
					data = Object.keys(data).map((item) => {
						return {
							label: item
								.split("_")
								.map((value) => S(value).capitalize().value())
								.join(" "),
							id: item,
						};
					});
					setPositions(data);
				})
				.catch((error) => {
					console.log(error);
					toast.error("Something went wrong!");
				});
		}

		// calling functions
		loadPositions();

		return () => {
			setPositions([]);
		};
	}, []);

	return (
		<Autocomplete
			id="position"
			name="position"
			options={positions}
			className="w-full"
			onChange={(e, value) => {
				handleFieldChange({ name: "position", value: value.id || "" });
			}}
			sx={{ width: 300 }}
			renderInput={(params) => {
				return <TextField {...params} label="Position" required />;
			}}
		/>
	);
}
