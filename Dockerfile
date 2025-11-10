FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN corepack enable pnpm && pnpm i

# Copy source code
COPY . .

# Build the application with error skipping
RUN corepack enable pnpm && pnpm build || pnpm start

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["pnpm", "start"]