FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start app
CMD npm run migration:run && npm run start:dev
