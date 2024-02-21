"use client";
import { hsl, hsla } from "@/app/_theme/utils";
import { createTheme } from "@mui/material";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: hsl(224, 71.4, 4.1),
			paper: hsl(224, 71.4, 4.1),
		},
		primary: {
			main: hsl(210, 20, 98),
			contrastText: hsl(220.9, 39.3, 11),
		},
		secondary: {
			main: hsl(215, 27.9, 16.9),
			contrastText: hsl(210, 20, 98),
		},
		error: {
			main: hsl(0, 62.8, 30.6),
			contrastText: hsl(210, 20, 98),
		},
		text: {
			primary: hsl(210, 20, 98),
			secondary: hsl(217.9, 10.6, 64.9),
		},
		divider: hsl(215, 27.9, 16.9),
		action: {
			active: hsl(220.9, 39.3, 11),
			hover: hsla(210, 20, 98, 0.9),
			selected: hsl(215, 27.9, 16.9),
			disabled: hsl(215, 27.9, 16.9),
			disabledBackground: hsl(215, 27.9, 16.9),
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: hsla(210, 20, 98, 0.9),
						textColor: hsl(220.9, 39.3, 11),
					},
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					backgroundColor: hsl(224, 71.4, 4.1),
					// border: `1px solid ${hsl(224, 11.4, 23.9)}`,
				},
			},
		},
	},
});

export { darkTheme };
