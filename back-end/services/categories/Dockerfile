FROM node:lts-alpine3.16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD yarn run start