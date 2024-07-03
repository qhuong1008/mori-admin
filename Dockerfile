# Dockerfile cho Admin
FROM node:18 AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Sử dụng nginx để phục vụ tệp tĩnh
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html/admin
COPY nginx/admin.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
