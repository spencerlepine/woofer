FROM node:10-alpine as builder

# create and set app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json .
COPY .env .
RUN npm install

COPY . .

#Expose port and start application
# EXPOSE 3000
# CMD ["npm", "start"]
RUN npm run build

# production environment
# FROM ngnix
FROM nginx:1.16.0-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]