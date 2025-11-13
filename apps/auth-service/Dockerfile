# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

COPY package*.json pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps ./apps

# Toolchain for native modules (e.g., bcrypt)
RUN apk add --no-cache python3 make g++ \
  && pnpm install --frozen-lockfile=false \
  && pnpm --filter @jungle/auth-service build \
  && apk del --no-cache python3 make g++

EXPOSE 3002
CMD ["pnpm", "--filter", "@jungle/auth-service", "start"]
