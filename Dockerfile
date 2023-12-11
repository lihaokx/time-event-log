# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the local code to the container
COPY . .

# Build the React app
RUN yarn build

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "start"]
