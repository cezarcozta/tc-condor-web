"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#17385C",
    },
    secondary: { main: "#FFF" },
  },
});

export default theme;
