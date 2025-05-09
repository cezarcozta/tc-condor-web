import { auth } from "@/lib/authentication";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  if (!session.user.role) {
    redirect("/choose-profile");
  }
  const role = session?.user.role;
  if (role === "PATIENT") {
    redirect("/patient");
  }
  if (role === "DOCTOR") {
    redirect("/doctor");
  }
}
