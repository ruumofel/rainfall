FROM node:14
WORKDIR /usr/src/app
COPY .env ./
COPY package*.json ./
COPY src/* ./
RUN npm install

EXPOSE 8080
CMD [ "node", "index.js" ]