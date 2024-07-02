# Development stage
FROM node:20-alpine as development

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000 for development
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]

# Production build stage
FROM development as build

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine as prod



# Copy build files from the build stage to Nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 82
EXPOSE 82

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
