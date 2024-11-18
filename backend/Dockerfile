# Base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy semua file proyek
COPY . .

# Build aplikasi
RUN yarn build

# Expose port 5000
EXPOSE 5000

# Jalankan server
CMD ["yarn", "start:prod"]
