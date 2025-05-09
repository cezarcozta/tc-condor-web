"use client";

import { useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { Error as ErrorIcon } from "@mui/icons-material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Paper
      elevation={0}
      sx={{ p: '2rem', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Ops alguma coisa de errado não esta certo!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Ocorreu um erro. Porfavor tente novamente ou retorne para pagina inicial.
      </Typography>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => reset()}>
          Resetar
        </Button>
        <Button variant="outlined" onClick={() => router.push("/")}>
          Inicio
        </Button>
      </Box>
    </Paper>
  );
}