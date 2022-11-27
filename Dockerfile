#Stage 1
FROM node:17-alpine as builder
WORKDIR /risk-front-end
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /risk-front-end/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]