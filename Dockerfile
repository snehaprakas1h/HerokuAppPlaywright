# Use official Playwright base image
FROM mcr.microsoft.com/playwright:v1.51.0-jammy

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Run Playwright tests
CMD ["npx", "playwright", "test"]
