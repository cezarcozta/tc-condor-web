'use server';

import { redirect } from "next/navigation";
import { auth } from "../../lib/authentication";
import { sleepDiarySchema } from "@/lib/validators";



export async function handleDiaryEntry(formData: FormData) {
  const session = await auth();
  if (session) {
    const data = Object.fromEntries(formData.entries());
    const parsed = sleepDiarySchema.safeParse(data);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return { success: false, errors };
    }
    const validData = parsed.data;
    const id = session.user?.id;

    const body = {
      how_long: {
        hours: validData.how_long_hours,
        minutes: validData.how_long_minutes
      },
      time_to_bed: {
        hours: validData.time_to_bed_hours,
        minutes: validData.time_to_bed_minutes
      },
      wakes_up: validData.wakes_up,
      took_medication: validData.took_medication
    }

    const response = await fetch(`${process.env.FLASKAPI_BASE_URL}/patient`, { method: 'POST', body: JSON.stringify(body) })
    const isOk = response.ok;
    if (isOk) return redirect(`/patient/${id}`);

    return redirect('/')
  }
  return redirect('/login')
}