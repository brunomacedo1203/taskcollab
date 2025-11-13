# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps ./apps

RUN npm install

# Build in the workspace directory to ensure proper tsconfig resolution
WORKDIR /app/apps/tasks-service
RUN npm run build

EXPOSE 3003
CMD ["npm", "run", "start"]
