FROM node:9.4.0-slim

LABEL mantainer: Maurice Domínguez <maurice.dominguez@kairosds.com>

WORKDIR /dependencies/microservices/orders

ADD microservices/orders /dependencies/microservices/orders
ADD __fixtures__ /dependencies/__fixtures__
ADD core /dependencies/core
ADD DB /dependencies/DB
ADD core.js /dependencies
ADD package.json /dependencies

RUN npm install --production

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "npm", "start" ]