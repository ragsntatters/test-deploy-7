FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application files
COPY dist/ dist/
COPY prisma/ prisma/

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3001

# Start application
CMD ["node", "dist/index.js"]