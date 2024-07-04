#stage 1: build
FROM node:18 as build-stage

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

# RUN npm install -g yarn --force

RUN npm install

# stage 2: build
COPY . .

RUN npm run build

from nginx:1.18 as deploy-stage
WORKDIR /deploy
COPY --from=build-stage /app/build .
COPY nginx.conf /etc/nginx/nginx.conf
