import { z } from "zod";

export const env = z.object({
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/echelon"),
  JWT_ACCESS_SECRET: z.string().default("dev-access-secret"),
  JWT_REFRESH_SECRET: z.string().default("dev-refresh-secret"),
  OPENAI_API_KEY: z.string().optional(),
  PORT: z.coerce.number().default(4000),
}).parse(process.env);
