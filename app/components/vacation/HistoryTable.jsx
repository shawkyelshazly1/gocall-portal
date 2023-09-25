import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
import S from "underscore.string";

import moment from "moment";
import { FaFileExport } from "react-icons/fa";
import { exportToCsv } from "helpers/vacation";
import { getServerSession } from "next-auth";
import { authOptions } from "api/auth/[...nextauth]/route";
import ExportDataButton from "./ExportDataButton";

async function getData(userId) {
	let res = await fetch(`${process.env.URL}/api/vacation/load/${userId}`, {
		method: "GET",
	});

	if (!res.ok) {
		throw new Error("Something went wrong!");
	}

	return res.json();
}

export default async function HistoryTable() {
	const { user } = await getServerSession(authOptions);

	

	let requests = await getData(user?.id);

	return (
		<>
			<ExportDataButton data={requests} />
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
