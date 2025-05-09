import GoogleProvider from "next-auth/providers/google";
import Resend from "next-auth/providers/resend"
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "../db/prisma";
// import bcrypt from "bcrypt";

// interface ICredentials {
//   email: string;
//   password: string;
// }

export const providers = [
  GoogleProvider({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  }),
  Resend({
    apiKey: process.env.AUTH_RESEND_KEY!
  })
  // CredentialsProvider({
  //   name: "Credentials",
  //   credentials: {
  //     email: { label: "Email", type: "email" },
  //     password: { label: "Password", type: "password" },
  //   },
  //   async authorize(credentials) {
  //     const credential = credentials as ICredentials;
  //     const email = credential.email;
  //     const password = credential.password;

  //     // Find user
  //     const user = await prisma.user.findUnique({
  //       where: { email },
  //     });

  //     if (!user?.password) {
  //       return null;
  //     }

  //     // Verify password
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       return null;
  //     }

  //     // Return user data
  //     return {
  //       id: user.id.toString(),
  //       email: user.email,
  //       name: user.name,
  //       image: user.image
  //     };
  //   },
  // }),
]