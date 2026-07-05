# Echelon Core

Production-oriented MVP foundation for Echelon, an AI-powered operating system for local commerce. The initial module is the Services Marketplace, with extension points for jobs, events, networking, marketplace, rewards, and AI concierge.

## Apps

- `apps/web` — Next.js 15 marketplace, dashboards, auth, booking flow.
- `apps/api` — Fastify REST API with service/repository layering, JWT auth, rate limits, logging, AI gateway routes.

## Packages

- `packages/database` — Prisma schema and client export.
- `packages/shared` — shared domain constants and validation schemas.
- `packages/types` — shared TypeScript contracts.
- `packages/ai` — provider-abstracted AI gateway with OpenAI implementation.
- `packages/integrations` — Stripe and GoHighLevel integration boundaries.
- `packages/ui` — reusable UI primitives.

## Quick start

```bash
pnpm install
cp .env.example .env
pnpm typecheck
pnpm lint
pnpm dev
```
