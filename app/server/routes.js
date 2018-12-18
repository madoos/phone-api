const {
    createRouter,
    withStatus,
    flow,
    projection,
    background
} = require('express-flow-extensions');
const { hasData, isEmpty, hasError, debug } = require('../utils');
const controllers = require('../controllers');
const validation = require('./validation');
const {
    OK,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    CREATED
} = require('http-status');

const healthCheck = createRouter([
    {
        method  : 'GET',
        path    : '/health',
        handler : flow(controllers.health.check)
    }
]);

const phone = createRouter([
    {
        method  : 'GET',
        path    : '/',
        handler : flow(
            controllers.phone.all,
            withStatus({
                [OK]                    : hasData,
                [NOT_FOUND]             : isEmpty,
                [INTERNAL_SERVER_ERROR] : hasError
            })
        )
    }
]);

const order = createRouter([
    {
        method     : 'POST',
        path       : '/',
        validation : {
            body : validation.phones
        },
        handler : flow(
            projection({
                customer : 'user',
                phones   : 'body'
            }),
            controllers.order.create,
            background(debug('New Order Created:')),
            withStatus({
                [CREATED]               : hasData,
                [INTERNAL_SERVER_ERROR] : hasError
            })
        )
    }
]);

module.exports = {
    healthCheck,
    phone,
    order
};
