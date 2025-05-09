"use client";

import { ArrowBack, ExitToApp } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { handleGoogleAuth } from "../actions/handleGoogleAuth";
import { useRouter } from "next/navigation";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: ".25rem",
        }}
      >
        <Typography variant="h6" component="p" noWrap ml="1rem">
          Condor Instruments |
          <Typography variant="subtitle1" component="a" noWrap ml="1rem">
            Diário do sono
          </Typography>
        </Typography>

        <Box component="form" action={handleGoogleAuth}>
          <Button
            type="submit"
            variant="text"
            color="secondary"
            disableElevation
            size="large"
            endIcon={<ExitToApp />}
          >
            Exit
          </Button>
        </Box>
      </AppBar>

      <Container>
        <Button
          variant="text"
          sx={{ marginTop: "3.5rem" }}
          onClick={handleGoBack}
        >
          <ArrowBack />
          Voltar
        </Button>
        <Paper sx={{ mt: "1rem", p: "1rem" }} component="section">
          {children}
        </Paper>
      </Container>
    </>
  );
}
