const {
    CREATED,
    UNPROCESSABLE_ENTITY,
    INTERNAL_SERVER_ERROR
} = require('http-status');
const {
    createRouter,
    flow,
    withStatus,
    background,
    projection
} = require('express-flow-extensions');
const { server, utils } = require('core');
const { isValidOrder, isInvalidOrder, hasError, debug } = utils;
const config = require('./config');
const controller = require('./controller');
const middleware = require('./middleware');
const validation = require('./validation');

const app = server.create({
    docs : {
        path       : '/docs',
        definition : config.server.api
    }
});

const healthCheckRouter = createRouter([
    {
        method  : 'GET',
        path    : '/health',
        handler : flow(controller.healthCheck)
    }
]);

const orderRouter = createRouter([
    {
        method     : 'POST',
        path       : '/',
        validation : {
            body : {
                data : validation.phones
            }
        },
        handler : flow(
            projection({
                customer : 'user',
                phones   : 'body.data'
            }),
            controller.createOrder,
            background(debug('Order:')),
            withStatus({
                [CREATED]               : isValidOrder,
                [UNPROCESSABLE_ENTITY]  : isInvalidOrder,
                [INTERNAL_SERVER_ERROR] : hasError
            })
        )
    }
]);

app.use(middleware.fakeAuthentication)
    .use(healthCheckRouter)
    .use('/orders', orderRouter);

module.exports = app;
