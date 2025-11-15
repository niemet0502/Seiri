# Use a suitable Node.js base image (e.g., LTS version)
FROM node:20-alpine AS development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your NestJS application listens on (e.g., 3000)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]