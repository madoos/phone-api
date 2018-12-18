FROM node:9.4.0-slim

LABEL mantainer: Maurice Domínguez <maurice.dominguez@kairosds.com>

WORKDIR /home/app/

ADD . .

RUN npm install

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "npm", "start" ]