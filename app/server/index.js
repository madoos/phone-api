const express = require('express');
const { Router } = express;
const expressExtensions = require('express-flow-extensions');

const enableSecurity = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const middleware = require('./middleware');
const routers = require('./routes');

const server = expressExtensions(express());

server
    .disable('x-powered-by')
    .use(enableSecurity())
    .use(cors({ origin : '*' }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended : false }))
    .use(methodOverride('X-HTTP-Method')) // Microsoft
    .use(methodOverride('X-HTTP-Method-Override')) // Google/GData
    .use(methodOverride('X-Method-Override')); // IBM

const apiRouter = Router();
const phoneRouter = Router();
const orderRouter = Router();

server.use(
    middleware.fakeAuthentication,
    apiRouter.use(
        '/api',
        routers.healthCheck,
        phoneRouter.use('/phone', routers.phone),
        orderRouter.use('/order', routers.order)
    )
);

module.exports = server;
