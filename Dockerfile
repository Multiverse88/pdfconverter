# Dockerfile para desarrolladores que usan Docker localmente
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application
COPY . .

# Expose port
EXPOSE 3000

# Environment
ENV NODE_ENV=development

# Start development server
CMD ["npm", "run", "dev"]
