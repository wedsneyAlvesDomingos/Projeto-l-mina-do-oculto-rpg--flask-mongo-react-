# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./
COPY ./package-lock.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the contents of the frontend directory to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]