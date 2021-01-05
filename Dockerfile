# specify the node base image with your desired version node:<version>
FROM node:10-alpine
# replace this with your application's default port


WORKDIR /usr/src/app

COPY package.json ./

RUN npm install


COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]