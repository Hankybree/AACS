FROM node:latest as node 
# Create app directory 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install 

COPY . /usr/src/app

RUN npm run build 

FROM nginx:latest
COPY --from=node /usr/src/app/dist/ /usr/share/nginx/html
COPY ./nginx-config.conf /etc/nginx/conf.d/default.conf