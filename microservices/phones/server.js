const { createRouter, flow, withStatus } = require('express-flow-extensions');
const { hasData, isEmpty, hasError } = require('core').utils;
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status');
const config = require('./config');
const server = require('core').server;
const controller = require('./controller');

const app = server.create({
    docs : {
        path       : '/docs',
        definition : config.server.api
    }
});

const phoneRouter = createRouter([
    {
        method  : 'GET',
        path    : '/',
        handler : flow(
            controller.getPhones,
            withStatus({
                [OK]                    : hasData,
                [NOT_FOUND]             : isEmpty,
                [INTERNAL_SERVER_ERROR] : hasError
            })
        )
    }
]);

app.use('/phones', phoneRouter);

module.exports = app;
