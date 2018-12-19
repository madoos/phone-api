[![Coverage Status](https://coveralls.io/repos/github/madoos/phone-api/badge.svg?branch=develop)](https://coveralls.io/github/madoos/phone-api?branch=develop)

# Phone API

- [Prerequisites](#Prerequisites)
- [How to launch the app?](#How-to-launch-the-app)
- [How to consume the app?](#How-to-launch-the-app)
- [API documentation](#API-documentation)
- [Run tests](#Run-tests)
- [Develop conventions](#Develop-conventions)
- [Development approach](#Development-approach)
- [Challenge answers](CHALLENGE_ANSWERS.md)

## Prerequisites

- node ^8.11.1
- npm ^6.1.0
- docker ^18.09.0
- docker-compose ^1.23.1

## How to launch the app?

The application consists of two (phones and orders) microservices and a database.

First you have to install the dependencies:

```bash
npm i
npm i --prefix microservices/phones
npm i --prefix microservices/orders

```

To launch the application:

Local env:

- `docker-compose up db`: start mongo database.
- `npm start --prefix microservices/phones`: start phones service.
- `npm start --prefix microservices/orders`: start orders service.
- `npm run fixtures`: load data in database

Develop env:

- `npm run dev:phones`: start database, start service phones with nodemon and load fixtures.
- `npm run dev:orders`: start database, start service orders with nodemon and load fixtures.

Docker env:

- `./bin/up.sh`: make docker-compose up (mongo, phones and orders) and load fixtures

Clear:

- `.bin/down.sh`: make docker-compose stop and rm and remove database data

IMPORTANT:

- Each time the fixtures are launched the database is deleted and then data is added.
- Every time the service `orders` is launched, the authentication token changes if it is not explicitly specified with the environment variable `USER_TOKEN`
- By default in all environments the service `phones` runs in port 3000 and service `orders`runs in the port 3001, to change that behavior use the environment variable SERVER_PORT
- The data base is mongo and runs in `mongodb://<HOST>:27017/masmovil`

## How to consume the app?

To consume data in service `orders` you have to be authenticated.
The application does not have real authentication but simulates one through middleware.
When the server is up, it shows by console the authentication token.
The token is generated dynamically and changes every time the application is launched.
If you want the token not to change, you can use the environment variable `USER_TOKEN`

Example:

```bash
npm start --prefix microservices/orders
```

in console:

```bash

App Orders started with config

{
  "user": {
    "token": "403dc1305d3c08ebdb085489204bc1ff"
  },
  "db": {
    "url": "mongodb://0.0.0.0:27017/masmovil"
  }
  ...
}

```

To consume:

```bash

curl -H "Authorization: 403dc1305d3c08ebdb085489204bc1ff" http://localhost:3001/health

```

With custom token:

```bash

USER_TOKEN=SUPER_SECRET npm start --prefix microservices/orders

curl -H "Authorization: SUPER_SECRET" http://localhost:3001/health

```

## API documentation

The API specification is written in swagger. To obtain documentation go to `http://<HOST>:<PORT>/docs`

## Run Test

launches unit tests and e2e

```bash
npm test
```

To see the coverage use `npm run serve:coverage`

## Develop conventions

- Develop with TDD approach, to pass tests while developing use the command `npm run tdd` inside each microservice
- Run test with `npm test`
- See coverage with `npm run serve:coverage`
- The unit tests are located on the same route of source file with extension `*.spec.js`
- The e2e tests are located in the`__tests__` folder.
- To make 2e2 test is not necessary any physical instance of mongo. The `__mocks__/_mongo` module solves that problem using [mongo-memory-server](https://www.npmjs.com/package/mongodb-memory-server)

- commit style validation with [commitlint standard](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional#type-enum)
- Linter with eslint
- Automatic code format with prettier-eslint
- Automatic changelog creation `npm run changelog`
- Use mongoose to maintain the data integrity in mongo

## Development approach

Application developed in monorepo an each microservice in layers and used as a fundamental tool [express-flow-extensions](https://github.com/madoos/express-flow-extensions)
(library created by me) to develop declaratively.
