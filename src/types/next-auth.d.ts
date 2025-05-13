import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      externalId: string;
      role: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    externalId: string;
    role: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    externalId: string;
    role: string | null;
  }
}
