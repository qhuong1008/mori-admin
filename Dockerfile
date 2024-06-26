# Use a lightweight Node.js image as the base
FROM node:alpine

# Set working directory
WORKDIR /app

RUN rm -rf node_modules

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --force --no-frozen-lockfile

# Copy all app files (excluding node_modules)
COPY . .

# Install additional dependencies for build process only (optional)

# Build the React app for production (adjust based on your build command)
RUN npm run build

# Expose the port where the React app is served (usually 3000)
EXPOSE 80

# Start the app using the command you specify in your package.json (usually npm start)
CMD [ "npm", "start" ]