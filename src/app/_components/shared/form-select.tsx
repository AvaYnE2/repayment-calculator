import ClearIcon from "@mui/icons-material/Clear";
import {
	FormControl,
	IconButton,
	InputAdornment,
	MenuItem,
	Select,
	SelectChangeEvent,
	Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import useId from "@mui/utils/useId";
import React from "react";

interface Props {
	value: string | undefined;
	onChange: (event: string) => void;
	label: string;
	selectOptions: string[];
	unit?: string;
	resetValue: (value: string) => void;
}
const FormSelect: React.FC<Props> = ({
	value,
	onChange,
	label,
	selectOptions,
	unit,
	resetValue,
}) => {
	const id = useId();
	const labelId = `label-${id}`;

	const handleChange = (event: SelectChangeEvent) => {
		onChange(event.target.value);
	};
	return (
		<Box sx={{ minWidth: 120 }} position="relative">
			<Tooltip title="Zurücksetzen">
				<IconButton
					type="button"
					sx={{
						position: "absolute",
						top: -6,
						right: 0,
						zIndex: 100,
					}}
					onClick={() => resetValue("0")}
					aria-label="clear"
				>
					<ClearIcon color="secondary" />
				</IconButton>
			</Tooltip>
			<FormControl fullWidth variant="standard">
				<Select
					labelId={labelId}
					id={id}
					value={value}
					label={label}
					onChange={handleChange}
					IconComponent={() => null}
					startAdornment={
						<InputAdornment
							sx={{
								marginRight: "2rem",
								pointerEvents: "none",
								position: "absolute",
								left: 0,
							}}
							position="start"
						>
							{unit}
						</InputAdornment>
					}
					sx={{
						minWidth: "100%",
						pl: "3rem",
						textAlign: "start",
						"& .MuiSelect-select": {
							textAlignLast: "start",
							backgroundColor: "transparent",
						},
					}}
				>
					{selectOptions.map((option) => (
						<MenuItem key={`item-${option}`} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default FormSelect;
