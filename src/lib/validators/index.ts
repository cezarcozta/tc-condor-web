import { z } from 'zod';

export const sleepDiarySchema = z.object({
  sleepDurationHours: z
    .string({ required_error: 'Duração do sono é obrigatório' })
    .nonempty('Duração do sono é obrigatório')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 23, {
      message: "Horas devem estar entre 0 e 23",
    }),
  sleepDurationMinutes: z
    .string({ required_error: 'Duração do sono é obrigatório' })
    .nonempty('Duração do sono é obrigatório')
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 59, {
      message: "Minutos devem estar entre 0 e 59",
    }),
  timeToBed: z
    .string({ required_error: 'Hora de deitar é obrigatório' })
    .nonempty('Hora de deitar é obrigatória')
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Deve estar no formato HH:mm, 00:00–23:59',
    }),
  wakesUp: z
    .string({ required_error: 'Número de despertares é obrigatório' })
    .nonempty('Número de despertares é obrigatório')
    .refine((val) => Number(val) >= 0, {
      message: "Número de despertares é inválido",
    }),
});
interface IFormDataDiaryEntry {
  sleepDurationHours: string;
  sleepDurationMinutes: string;
  timeToBed: string;
  wakesUp: string;
  tookMedication: boolean;
}
interface IFormDataErrorDiaryEntry {
  sleepDurationHours: string;
  sleepDurationMinutes: string;
  timeToBed: string;
  wakesUp: string;
}
export const validateSleepDiaryForm = (data: IFormDataDiaryEntry) => {
  try {
    sleepDiarySchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: IFormDataErrorDiaryEntry = {
        sleepDurationHours: "",
        sleepDurationMinutes: "",
        timeToBed: "",
        wakesUp: "",
      };
      error.errors.forEach((err) => {
        const field = err.path[0];
        if (field && newErrors.hasOwnProperty(field)) {
          if (field === "sleepDurationHours") {
            newErrors[field] = err.message;
          }
          if (field === "sleepDurationMinutes") {
            newErrors[field] = err.message;
          }
          if (field === "timeToBed") {
            newErrors[field] = err.message;
          }
          if (field === "wakesUp") {
            newErrors[field] = err.message;
          }
        }
      });
      return { isValid: false, errors: newErrors };
    }
    return { isValid: false, errors: error };
  }
};