FROM node:17-alpine as builder
WORKDIR risk-front-end
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm i serve
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "npx", "serve", "build" ]