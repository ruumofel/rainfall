FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY src/* ./
RUN npm install
EXPOSE 8080
CMD [ "node", "index.js" ]