# Phone API

- [Prerequisites](#Prerequisites)
- [How to launch the app?](#How-to-launch-the-app)
- [How to consume the app?](#How-to-launch-the-app)
- [API documentation](#API-documentation)
- [Develop conventions](#Develop-conventions)
- [Development approach](#Development-approach)

## Prerequisites

- node ^8.11.1
- npm ^6.1.0
- docker ^18.09.0
- docker-compose ^1.23.1

## How to launch the app?

Local env:

- `docker-compose up db`: start mongo database.
- `npm start`: start server.
- `npm run fixtures`: load data in database

Develop env:

- `npm run dev`: start database, start server with nodemon and load fixtures.

Docker env:

- `./bin/up.sh`: make docker-compose up and load fixtures

Clear:

- `./bin/down.sh`: make docker-compose stop and rm and remove database data

IMPORTANT:

- Each time the fixtures are launched the database is deleted and then data is added.

- Every time the server is launched, the authentication token changes if it is not explicitly specified with the environment variable `USER_TOKEN``
- By default in all environments the server runs in port 3000, to change that behavior use the environment variable SERVER_PORT
- The data base is mongo and runs in `mongodb://<HOST>:27017/masmovil`

## How to consume the app?

To consume data you have to be authenticated.
The application does not have real authentication but simulates one through middleware.
When the server is up, it shows by console the authentication token.
The token is generated dynamically and changes every time the application is launched.
If you want the token not to change, you can use the environment variable USER_TOKEN

Example:

```bash
npm start
```

in console:

```bash

App started with config

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

curl -H "Authorization: 403dc1305d3c08ebdb085489204bc1ff" http://localhost:3000/api/phones

```

With custom token:

```bash

USER_TOKEN=SUPER_SECRET npm start

curl -H "Authorization: SUPER_SECRET" http://localhost:3000/api/phones

```

## API documentation

The API specification is written in swagger. To obtain documentation go to `http://<HOST>:<PORT>/api/docs/`

## Develop conventions

- Develop with TDD approach, to pass tests while developing use the command `npm run tdd`
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

Application developed in layers and used as a fundamental tool [express-flow-extensions](https://github.com/madoos/express-flow-extensions)
(library created by me) to develop declaratively.
