import { PrismaClient } from "./generated";

class PrismaSingletonClient {
  private static instance: PrismaClient;

  private constructor() { }

  public static getInstance(): PrismaClient {
    if (!PrismaSingletonClient.instance) {
      PrismaSingletonClient.instance = new PrismaClient({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
        errorFormat: "pretty"
      });
    }
    return PrismaSingletonClient.instance;
  }
}

const prisma = PrismaSingletonClient.getInstance();
export default prisma;
