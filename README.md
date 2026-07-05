# Echelon Core

Production-oriented MVP foundation for Echelon, an AI-powered operating system for local commerce. The initial module is the Services Marketplace, with extension points for jobs, events, networking, marketplace, rewards, and AI concierge.

## Apps

- `apps/web` — Next.js 15 marketplace, dashboards, auth, booking flow.
- `apps/api` — Fastify REST API with service/repository layering, JWT auth, rate limits, logging, AI gateway routes.

## Packages

- `packages/database` — Prisma schema, generated client export, and deterministic seed data.
- `packages/shared` — shared domain constants and validation schemas.
- `packages/types` — shared TypeScript contracts.
- `packages/ai` — provider-abstracted AI gateway with OpenAI implementation and local fallback.
- `packages/integrations` — Stripe and GoHighLevel integration boundaries.
- `packages/ui` — reusable UI primitives.

## Quick start

```bash
pnpm install
cp .env.example .env
docker compose up -d postgres redis
pnpm db:generate
pnpm db:push
pnpm db:seed
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:4000
- Health check: http://localhost:4000/health
- AI search endpoint: `POST http://localhost:4000/chat`

The API seeds the database on startup when no businesses exist, so local development works after `docker compose up` and Prisma setup.
