import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import { prisma } from "@echelon/database";
import { env } from "./config/env.js";
import { routes } from "./routes/index.js";
import { ensureSeedData } from "./services/seed.service.js";

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });
await app.register(rateLimit, { max: 120, timeWindow: "1 minute" });
await app.register(jwt, { secret: env.JWT_ACCESS_SECRET });
await ensureSeedData(prisma);
await app.register(routes);
await app.listen({ port: env.PORT, host: "0.0.0.0" });
