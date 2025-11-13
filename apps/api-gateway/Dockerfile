# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Install dependencies for the whole monorepo (workspace aware)
COPY package*.json pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps ./apps

RUN pnpm install --frozen-lockfile=false

# Build in the workspace directory to ensure proper tsconfig resolution
WORKDIR /app/apps/api-gateway
RUN pnpm build

EXPOSE 3001
CMD ["pnpm", "start"]
