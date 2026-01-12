# Build stage
FROM node:20-alpine AS build

# This is a multi-stage Dockerfile for building and serving a Node.js web application (likely a React, Vue, or Angular SPA):

# Build Stage (node:20-alpine AS build):
# Uses Node.js 20 on Alpine Linux as the build environment
# Sets `/app` as working directory
# Copies `package.json` and `package-lock.json` first (for Docker layer caching)
# Installs dependencies with `npm ci` (faster, deterministic installs)
# Copies source code and builds the application with `npm run build`

# Production Stage (nginx:alpine):
# Uses lightweight Nginx on Alpine for serving static files
# Copies built assets from the build stage to Nginx's default directory
# Configures Nginx for Single Page Application routing (redirects all routes to `index.html`)
# Exposes port 80 and starts Nginx

# This approach creates a small production image (~20MB) since it only includes the built assets and Nginx, not Node.js or source code.

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
