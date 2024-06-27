# Use the official Node.js image as the base image
FROM node:20.13.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g ts-node typescript mongoose


# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

CMD ts-node src/seeds/seed.ts && node dist/app.js
