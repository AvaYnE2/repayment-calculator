import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header: React.FC = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h1"
					component="div"
					sx={{ flexGrow: 1, fontSize: "32px" }}
					textAlign="center"
				>
					Tilgungsrechner
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
