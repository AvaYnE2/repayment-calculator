import { Inter } from "next/font/google";

import Header from "@/app/_components/header/component";
import { darkTheme } from "@/app/_theme/main-theme";
import { TRPCReactProvider } from "@/trpc/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata = {
	title: "Repayment Calculator",
	description: "Calculate repayments",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="de">
			<body className={inter.className}>
				<AppRouterCacheProvider options={{ key: "css" }}>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<TRPCReactProvider>
							<Header />
							{children}
						</TRPCReactProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
