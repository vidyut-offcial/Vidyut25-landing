# ---------- Builder Stage ----------
    FROM node:18-alpine AS builder

    # Install build dependencies
    RUN apk add --no-cache g++ make py3-pip libc6-compat
    
    WORKDIR /app
    
    # Copy and install dependencies
    COPY package*.json ./
    RUN npm ci --legacy-peer-deps
    
    # Copy source files and build
    COPY . .
    RUN npm run build
    
    # ---------- Production Stage ----------
    FROM node:18-alpine AS production
    
    # Create non-root user
    RUN addgroup -g 1001 -S nodejs && \
        adduser -S nextjs -u 1001
    
    WORKDIR /app
    ENV NODE_ENV=production
    
    # Copy only necessary files for production
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/package.json ./package.json
    
    # Install only production dependencies
    RUN npm install --omit=dev --legacy-peer-deps
    
    USER nextjs
    EXPOSE 3000
    
    # Ensure you have a start script like: "start": "next start"
    CMD ["npm", "start"]
    