# Echelon Core

Production-oriented MVP foundation for Echelon, an AI-powered operating system for local commerce. The initial module is the Services Marketplace, with extension points for jobs, events, networking, marketplace, rewards, and AI concierge.

## Apps

- `apps/web` — Next.js marketplace, dashboards, Clerk auth, booking flow.
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

## Clerk on Vercel

Create a Clerk production instance for your custom domain, then add these variables to the Vercel project's Production environment:

```bash
NEXT_PUBLIC_APP_URL=https://echelonapp.net
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/register
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/auth/continue?mode=consumer&returnTo=%2Fdashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/auth/continue?mode=consumer&returnTo=%2Fwelcome
NEXT_PUBLIC_CLERK_SOCIAL_AUTH_ENABLED=false
```

Enable **Organizations** and **Personal accounts** in the Clerk Dashboard. Use Clerk development keys for Vercel Preview deployments and production keys for the Production environment. Set `NEXT_PUBLIC_APP_URL` independently in Preview and Production, then redeploy after changing environment variables. The proxy also trusts Vercel's current preview and production hostnames.

Keep `NEXT_PUBLIC_CLERK_SOCIAL_AUTH_ENABLED=false` until every enabled production social connection has custom OAuth credentials in Clerk. After configuring Google or Apple in **SSO connections**, set it to `true` and redeploy so the social buttons become available.

Keyless local development continues to use the development auth stub. A Vercel production build fails safely if either Clerk key is missing.

## Account model

Echelon uses one Clerk user per person. A user never needs a second login or duplicate email to become a business owner.

| Context | Clerk boundary | Application data key | Destination |
| --- | --- | --- | --- |
| Consumer | Personal account | `clerkUserId` | `/dashboard` |
| Business | Active Organization | `clerkOrganizationId` | `/business-dashboard` |

- Consumer sign-up creates the Clerk identity and continues through `/welcome`.
- Business sign-up creates the same Clerk identity, then creates or selects a Clerk Organization.
- An existing consumer can choose business mode and use the same email. Echelon adds a business workspace instead of creating another user.
- A business owner can switch back to personal mode without signing out. The continuation route clears the active Organization before opening the consumer dashboard.
- Users with multiple businesses choose an Organization before entering the business dashboard.
- Business routes require both a valid Clerk user and an active Organization. Consumer routes require only the Clerk user.

Never use email as a data ownership key. Persist consumer records with `clerkUserId`; persist business records with an internal `businessId` mapped uniquely to `clerkOrganizationId`. Every business query and mutation must filter by the active Organization before reading or changing data. Clerk `unsafeMetadata` is not used for authorization because users can modify it from the frontend.

When backend persistence is connected, sync Clerk `user.*`, `organization.*`, and `organizationMembership.*` webhooks into separate user, business, and membership tables. Customer bookings made personally remain attached to the user record even when that same user owns a business.
