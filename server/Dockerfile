# Use a multi-stage build for smaller final image size
FROM node:16-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Second stage for development
FROM base AS dev

# Install all dependencies (including dev dependencies)
RUN npm install

# Expose port 3000
EXPOSE 3000

# Copy source code
COPY . .

# Start app in development mode
CMD ["npm", "run", "start:dev"]

# Third stage for production
FROM base AS prod

# Set environment variables
ENV NODE_ENV=production

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start app in production mode
CMD ["node", "dist/main.js"]
