# ---------- Builder Stage ----------
    FROM node:18-alpine AS builder

    # Install build dependencies
    RUN apk add --no-cache g++ make py3-pip libc6-compat
    
    WORKDIR /app
    
    # Install dependencies and build the app
    COPY package*.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    
    # ---------- Production Stage ----------
    FROM node:18-alpine AS production
    
    # Create a non-root user
    RUN addgroup -g 1001 -S nodejs && \
        adduser -S nextjs -u 1001
    
    WORKDIR /app
    ENV NODE_ENV=production
    
    # Install only production dependencies
    COPY package*.json ./
    RUN npm install --omit=dev
    
    # Copy built app and required folders from builder stage
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    USER nextjs
    EXPOSE 3000
    
    CMD ["npm", "start"]