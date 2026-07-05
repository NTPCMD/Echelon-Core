FROM node:22-alpine AS base
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile=false && pnpm --filter @echelon/web build
CMD ["pnpm", "--filter", "@echelon/web", "dev"]
