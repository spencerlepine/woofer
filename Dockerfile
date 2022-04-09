#  Dockerfile for Node Express Backend api (development)

FROM node:14.15.3-alpine3.12

ARG NODE_ENV=production
ARG PORT=3000

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code + Bundle app source
COPY . /usr/src/app

RUN npm run build

# Exports
EXPOSE $PORT

CMD ["npm","start"]