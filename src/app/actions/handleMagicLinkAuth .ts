'use server';

import { auth, signIn, signOut } from "../../lib/authentication";

export async function handleMagicLink(formdata: FormData) {
  const session = await auth();
  if (session) {
    return await signOut({
      redirectTo: '/login'
    })
  }
  await signIn("resend", formdata);
}