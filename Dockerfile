FROM node:16-alpine AS build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app 
RUN npm run build

# SEGUNDA ETAPA
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/tour-buddy-web /usr/share/nginx/html