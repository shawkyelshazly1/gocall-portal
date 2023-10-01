"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import S from "underscore.string";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "firstName", headerName: "First Name", width: 130 },
	{ field: "lastName", headerName: "Last Name", width: 130 },
	{
		field: "positionName",
		headerName: "Position",
		width: 200,
		valueGetter: (params) =>
			`${S(params.row.position.split("_").join(" ")).capitalize().value()}`,
	},

	{
		field: "departmentName",
		headerName: "Department",
		width: 200,
		valueGetter: (params) =>
			`${
				S(params.row.department?.name.split("_").join(" "))
					.capitalize()
					.value() || ""
			}`,
	},

	{
		field: "managerName",
		width: 200,
		headerName: "Manager",
		valueGetter: (params) =>
			`${
				S(params.row.manager?.firstName.split("_").join(" "))
					.capitalize()
					.value() || ""
			} ${
				S(params.row.manager?.lastName.split("_").join(" "))
					.capitalize()
					.value() || ""
			}`,
	},
	{ field: "email", headerName: "Email", width: 250 },
];

export default function UsersTable() {
	const [users, setUsers] = useState([]);
	const [usersCount, setUsersCount] = useState(100);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function loadUsersCount() {
			await fetch(`/api/admin/userscount`, { method: "GET" })
				.then(async (res) => {
					return await res.json();
				})
				.then((data) => {
					setUsersCount(data);
				})
				.catch((error) => toast.error("Something went wrong!"));
		}

		// calling functions
		loadUsersCount();
		return () => {
			setUsersCount(0);
		};
	}, []);

	useEffect(() => {
		async function getUsers() {
			setLoading(true);
			await fetch(
				`/api/admin/users?skip=${
					paginationModel.page * paginationModel.pageSize
				}&take=${paginationModel.pageSize}`,
				{ method: "GET" }
			)
				.then(async (res) => {
					return await res.json();
				})
				.then((data) => {
					setUsers(data);
				})
				.catch((error) => toast.error("Something went wrong!"))
				.finally(() => {
					setLoading(false);
				});
		}

		// calling functions
		getUsers();
	}, [paginationModel.page]);

	return (
		<div className="w-full h-full ">
			<DataGrid
				rows={users}
				columns={columns}
				paginationModel={paginationModel}
				pagination
				paginationMode="server"
				onPaginationModelChange={setPaginationModel}
				pageSizeOptions={[10]}
				rowCount={usersCount}
				loading={loading}
			/>
		</div>
	);
}