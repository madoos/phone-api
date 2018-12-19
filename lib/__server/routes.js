const {
    createRouter,
    withStatus,
    flow,
    projection,
    background
} = require('express-flow-extensions');
const {
    hasData,
    isEmpty,
    hasError,
    debug,
    isInvalidOrder,
    isValidOrder
} = require('../utils');
const controllers = require('../controllers');
const validation = require('./validation');
const {
    OK,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    CREATED,
    UNPROCESSABLE_ENTITY
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
            body : {
                data : validation.phones
            }
        },
        handler : flow(
            projection({
                customer : 'user',
                phones   : 'body.data'
            }),
            controllers.order.create,
            background(debug('Order:')),
            withStatus({
                [CREATED]               : isValidOrder,
                [UNPROCESSABLE_ENTITY]  : isInvalidOrder,
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
