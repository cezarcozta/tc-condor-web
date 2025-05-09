"use client";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
type TProfile = "PATIENT" | "DOCTOR";
export default function ChooseProfile() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  console.log({ session: session.data?.user.role });
  const handleChoose = async (profile: TProfile) => {
    try {
      setIsLoading(true);
      await fetch(`/api/user/${session.data?.user?.id}/set-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      router.push(`/${profile.toLowerCase()}`);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {error && <Typography>{error}</Typography>}
      {!error && isLoading && <CircularProgress />}
      {!error && !isLoading && (
        <>
          <Typography variant="h4">
            Bem Vindo, {session.data?.user?.name}
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant="body1" alignSelf="center" fontWeight="bold">
            Escolha um perfil:
          </Typography>
          <Box display="flex" justifyContent="space-around">
            <Button onClick={() => handleChoose("PATIENT")}>PACIENTE</Button>
            <Button onClick={() => handleChoose("DOCTOR")}>MÉDICO</Button>
          </Box>
        </>
      )}
    </>
  );
}
