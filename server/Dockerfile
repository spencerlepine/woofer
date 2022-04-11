# install latest node
# https://hub.docker.com/_/node/
FROM node:14.15.3-alpine3.12

# create and set app directory
RUN mkdir -p /usr/src/nodejs/
WORKDIR /usr/src/nodejs/

# install app dependencies
COPY package.json .
RUN npm install && npm cache clean --force

# copy app source to destination container
COPY . .

# expose container port
EXPOSE 5000

CMD npm start