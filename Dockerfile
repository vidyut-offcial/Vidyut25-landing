# ---------- Base Stage ----------
FROM node:18-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# ---------- Builder Stage ----------
FROM base AS builder
COPY . .
RUN npm ci
RUN npm run build

# ---------- Production Stage ----------
FROM node:18-alpine AS production

# Setup non-root user
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed for production
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

CMD ["npm", "start"]

# ---------- Development Stage ----------
FROM base AS dev

ENV NODE_ENV=development

# Install dependencies with cache optimization
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
