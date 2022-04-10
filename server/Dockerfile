# install latest node
# https://hub.docker.com/_/node/
FROM node:10

# create and set app directory
RUN mkdir -p /usr/src/nodejs/
WORKDIR /usr/src/nodejs/

# install app dependencies
COPY package.json .
RUN npm install

# copy app source to destination container
COPY . .

# expose container port
EXPOSE 5000

CMD npm start