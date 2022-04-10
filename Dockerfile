# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:14.15.3-alpine3.12 as build-stage

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install --silent

# Copies everything over to Docker environment
COPY . ./

EXPOSE 3000

# Finally runs the application
CMD [ "npm", "start" ]