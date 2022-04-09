# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:14.15.3-alpine3.12

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Uses port which is used by the actual application
EXPOSE $PORT

# Finally runs the application
CMD [ "npm", "start" ]

# # pull official base image
# FROM node:14.15.3-alpine3.12

# # set working directory
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent

# # add app
# COPY . ./

# RUN npm run build

# # Exports
# EXPOSE $PORT

# CMD ["npm","start"]