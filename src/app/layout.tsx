import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/authentication";

const robotoFont = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Condor Instruments",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="pt-br" className={robotoFont.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
              <Box
                component="main"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "98vh",
                }}
              >
                {children}
              </Box>
            </SessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
