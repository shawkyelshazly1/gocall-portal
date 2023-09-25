"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import S from "underscore.string";

import moment from "moment";
import { FaFileExport } from "react-icons/fa";
import { exportToCsv } from "helpers/vacation";

export default function HistoryTable() {
	const { data } = useSession();

	const [requests, setRequests] = useState([]);

	useEffect(() => {
		if (data?.user?.id !== undefined) {
			fetch(`/api/vacation/load/${data?.user?.id}`, {
				method: "GET",
			})
				.then((res) => res.json())
				.then((data) => {
					setRequests(data);
				});
		}
	}, [data?.user?.id]);

	return (
		<>
			<button
				onClick={() => {
					exportToCsv(requests);
				}}
				className="rounded-3xl py-2 self-end px-4 w-fit bg-green-500 text-white font-medium flex flex-row items-center gap-3"
			>
				Export History <FaFileExport />
			</button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell
								align="center"
								sx={{ fontWeight: "bold", fontSize: "1em" }}
							>
								Vacation Type
							</TableCell>
							<TableCell
								align="center"
								sx={{ fontWeight: "bold", fontSize: "1em" }}
							>
								From
							</TableCell>
							<TableCell
								align="center"
								sx={{ fontWeight: "bold", fontSize: "1em" }}
							>
								To
							</TableCell>
							<TableCell
								align="center"
								sx={{ fontWeight: "bold", fontSize: "1em" }}
							>
								Days
							</TableCell>
							<TableCell
								align="center"
								sx={{ fontWeight: "bold", fontSize: "1em" }}
							>
								Status
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{requests.map((request, idx) => (
							<TableRow
								key={idx}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell align="center" component="th" scope="row">
									{S(request.reason.split("_").join(" ")).capitalize().value()}
								</TableCell>
								<TableCell align="center">
									{moment(request.from).format("MM/DD/yyyy")}
								</TableCell>
								<TableCell align="center">
									{moment(request.to).format("MM/DD/yyyy")}
								</TableCell>
								<TableCell align="center">
									{moment(request.to).diff(moment(request.from), "days") + 1}
								</TableCell>
								<TableCell align="center">
									<span
										className={`${
											request.approvalStatus === "pending"
												? "bg-amber-400"
												: request.approvalStatus === "approved"
												? "bg-green-500"
												: "bg-red-500"
										} text-white text-lg py-2 px-4 rounded-3xl font-medium`}
									>
										{S(request.approvalStatus).capitalize().value()}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
