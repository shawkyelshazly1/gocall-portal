"use client";

import { exportToCsv } from "helpers/vacation";
import { FaFileExport } from "react-icons/fa";

export default function ExportDataButton({ data }) {
	console.log(data);
	return (
		<button
			onClick={() => {
				exportToCsv(data);
			}}
			className="rounded-3xl py-2 self-end px-4 w-fit bg-green-500 text-white font-medium flex flex-row items-center gap-3"
		>
			Export History <FaFileExport />
		</button>
	);
}
