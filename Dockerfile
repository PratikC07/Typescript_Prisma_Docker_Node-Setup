# Development stage
FROM node:24-alpine as development

WORKDIR /app

# Copy package files
COPY server/package*.json ./
COPY server/prisma ./prisma/

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY server/src ./src/
COPY server/tsconfig.json ./
COPY server/nodemon.json ./

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "dev"]

# # Production build stage
# FROM node:24-alpine as build

# WORKDIR /app

# # Copy package files
# COPY server/package*.json ./
# COPY server/prisma ./prisma/

# # Install all dependencies
# RUN npm ci

# # Copy source code
# COPY server/src ./src/
# COPY server/tsconfig.json ./

# # Generate Prisma client
# RUN npx prisma generate

# # Build TypeScript
# RUN npm run build

# # Production stage
# FROM node:24-alpine as production

# WORKDIR /app

# # Copy package files
# COPY server/package*.json ./
# COPY server/prisma ./prisma/

# # Install only production dependencies
# RUN npm ci --only=production

# # Copy built application from build stage
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/src/generated ./src/generated

# # Generate Prisma client for production
# RUN npx prisma generate

# # Create non-root user
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs

# # Expose port
# EXPOSE 5000

# CMD ["npm", "start"]