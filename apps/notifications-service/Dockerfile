# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

COPY package*.json pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps ./apps

RUN pnpm install --frozen-lockfile=false

# Build in the workspace directory to ensure proper tsconfig resolution
WORKDIR /app/apps/notifications-service
RUN pnpm build

EXPOSE 3004
CMD ["pnpm", "start"]
