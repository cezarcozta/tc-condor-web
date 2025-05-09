"use client";

import { validateSleepDiaryForm } from "@/lib/validators";
// import fetchFlask from "@/server/fetchFlask";
import { AccessAlarm, Add, Bedtime, HourglassEmpty } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Input from "../../../../ui/Input";
import { useRouter } from "next/navigation";
interface IFormDataDiaryEntry {
  sleepDurationHours: string;
  sleepDurationMinutes: string;
  timeToBed: string;
  wakesUp: string;
  tookMedication: boolean;
}
const emptyData: IFormDataDiaryEntry = {
  sleepDurationHours: "",
  sleepDurationMinutes: "",
  timeToBed: "",
  wakesUp: "",
  tookMedication: false,
};
interface IFormDataError {
  sleepDurationHours: string;
  sleepDurationMinutes: string;
  timeToBed: string;
  wakesUp: string;
}
const emptyErrorData: IFormDataError = {
  sleepDurationHours: "",
  sleepDurationMinutes: "",
  timeToBed: "",
  wakesUp: "",
};
interface IAPIDataDiaryEntry {
  userId: string;
  sleepDurationInMinutes: number;
  timeToBed: string;
  wakesUp: number;
  tookMedication: boolean;
}
export default function SleepDiaryEntry() {
  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user?.id ?? "";
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<IFormDataError>(emptyErrorData);
  const [data, setData] = useState<IFormDataDiaryEntry>(emptyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    setData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setFormErrors(emptyData);
      const validate = validateSleepDiaryForm(data);
      const isValid = validate.isValid;
      if (isValid) {
        const body: IAPIDataDiaryEntry = {
          userId,
          sleepDurationInMinutes:
            Number(data.sleepDurationHours) * 60 +
            Number(data.sleepDurationMinutes),
          timeToBed: data.timeToBed,
          wakesUp: Number(data.wakesUp),
          tookMedication: data.tookMedication,
        };
        console.log({ body });
        setIsLoading(true);
        new Promise((resolve) => setTimeout(resolve, 5000)); //fetchFlask({ endpoint: "/", method: "POST" });
        router.push(`/patient/${userId}`);
      } else {
        const errors = validate.errors as IFormDataError;
        setFormErrors(errors);
      }
    } catch (error) {
      const err = error as Error;
      console.log({ error });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {error && <Typography>{error}</Typography>}
      {isLoading && !error && <CircularProgress />}
      {!isLoading && !error && (
        <Stack spacing={1} sx={{ display: "flex", m: "1rem" }}>
          <Typography variant="h4" alignSelf="center">
            Registrar Entrada
          </Typography>

          <Input
            id="exclusiveId"
            label="ID Exclusivo"
            name="id"
            type="text"
            onChange={handleChangeData}
            value={`PAT-000${userId}`}
            disabled
          />
          <Grid container spacing={1} width="100%">
            <Grid component="section" size={{ xs: 12, md: 6 }}>
              <Input
                id="sleepDurationHours"
                key="sleepDurationHours"
                name="sleepDurationHours"
                type="number"
                error={formErrors.sleepDurationHours}
                label="Quanto tempo você dormiu na noite passada?"
                onChange={handleChangeData}
                value={data.sleepDurationHours}
                endAdornment="horas"
                icon={<HourglassEmpty />}
                htmlInput={{
                  min: 0,
                  max: 23,
                }}
              />
            </Grid>
            <Grid component="section" size={{ xs: 12, md: 6 }}>
              <Input
                id="sleepDurationMinutes"
                key="sleepDurationMinutes"
                name="sleepDurationMinutes"
                type="number"
                error={formErrors.sleepDurationMinutes}
                label="Quanto tempo você dormiu na noite passada?"
                onChange={handleChangeData}
                value={data.sleepDurationMinutes}
                endAdornment="minutos"
                icon={<HourglassEmpty />}
                htmlInput={{
                  min: 0,
                  max: 59,
                }}
              />
            </Grid>
          </Grid>
          <Input
            id="timeToBed"
            key="timeToBed"
            name="timeToBed"
            type="time"
            label="A que horas você deitou?(horas)"
            error={formErrors.timeToBed}
            onChange={handleChangeData}
            value={data.timeToBed}
            icon={<Bedtime />}
          />
          <Input
            id="wakesUp"
            name="wakesUp"
            placeholder="2"
            type="number"
            label="Quantas vezes você despertou durante a noite?"
            error={formErrors.wakesUp}
            onChange={handleChangeData}
            value={data.wakesUp}
            icon={<AccessAlarm />}
            htmlInput={{
              min: 0,
              max: 1000,
            }}
          />

          <InputLabel
            htmlFor="took_medication"
            sx={{
              color: "primary.dark",
              fontWeight: "bold",
              fontSize: "0.75rem",
              mb: "0.5rem",
            }}
          >
            Você tomou algum medicamento?
          </InputLabel>
          <Box display="flex" alignItems="center">
            <Typography variant="overline">Não</Typography>
            <Switch
              key="took_medication"
              id="took_medication"
              name="tookMedication"
              onChange={handleChangeData}
              checked={data.tookMedication}
            />
            <Typography variant="overline">Sim</Typography>
          </Box>

          <Button
            type="button"
            variant="contained"
            color="primary"
            disableElevation
            size="large"
            endIcon={<Add />}
            onClick={handleSubmit}
          >
            Adicionar
          </Button>
        </Stack>
      )}
    </>
  );
}
