"use client";

import { Box, Button, Divider, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PatientHome() {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      <Typography variant="h4">
        Bem Vindo, {session.data?.user?.name}
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="body1" alignSelf="center" fontWeight="bold">
        Escolha uma opção:
      </Typography>
      <Box display="flex" justifyContent="space-around">
        <Button onClick={() => router.push("/patient/newEntry")}>
          Criar Novo Registro{` >>`}
        </Button>
        <Button
          onClick={() =>
            router.push(`/patient/${session.data?.user?.externalId}`)
          }
        >
          Visualizar Diario{` >>`}
        </Button>
      </Box>
    </>
  );
}
