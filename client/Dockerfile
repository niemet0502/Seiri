# Development stage
FROM node:20-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]


# Production build stage
FROM development as build
RUN npm run build


# ================================
# PRODUCTION STAGE (NGINX + TEMPLATE)
# ================================
FROM nginx:alpine AS prod

# Install envsubst (part of gettext)
RUN apk add --no-cache bash gettext

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx template instead of real config
COPY nginx.conf /etc/nginx/conf.d/nginx.conf.template

# Copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose your desired port
EXPOSE 82

# Use the custom entrypoint that generates nginx config dynamically
ENTRYPOINT ["/entrypoint.sh"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
