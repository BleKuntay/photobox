# Base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy semua file proyek
COPY . .

# Build React app
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Jalankan React development server
CMD ["yarn", "start"]
