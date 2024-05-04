FROM node:16-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

FROM base AS dev
# Install dependencies
RUN npm install 

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start app
# CMD npm run migration:run && npm run start:dev
CMD ["npm", "run", "start:dev"]

FROM base AS prod

ENV NODE_ENV production

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
