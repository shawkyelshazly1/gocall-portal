import { Menu, MenuItem } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { CgUnavailable } from "react-icons/cg";

export default function ContextMenu({
	anchorPosition,
	onClose,
	onMenuItemClick,
}) {
	return (
		<Menu
			anchorReference="anchorPosition"
			anchorPosition={anchorPosition}
			open={Boolean(anchorPosition)}
			onClose={onClose}
		>
			<MenuItem
				onClick={() => onMenuItemClick("Option 1")}
				className="flex w-full flex-row gap-2 items-center"
			>
				<AiFillEdit />
				Edit
			</MenuItem>
			<MenuItem
				onClick={() => onMenuItemClick("Option 2")}
				className="flex w-full flex-row gap-2 items-center"
			>
				<CgUnavailable />
				Deactivate
			</MenuItem>
		</Menu>
	);
}
