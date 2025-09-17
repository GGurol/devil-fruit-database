# frontend/Dockerfile
FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb ./

# Install dependencies using Bun's fast installer
RUN bun install

EXPOSE 5173