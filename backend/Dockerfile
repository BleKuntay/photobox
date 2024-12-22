# Base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy semua file proyek
COPY . .

# Build aplikasi
RUN npm run build

# Expose port 300
EXPOSE 3000

# Jalankan server
CMD ["npm", "run", "start:prod"]
