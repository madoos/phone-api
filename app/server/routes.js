const expressExtensions = require('express-flow-extensions');
const { createRouter, withStatus, flow } = expressExtensions;
const utils = require('../utils');
const controllers = require('../controllers');
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status');

const healthCheck = createRouter([
    {
        method  : 'GET',
        path    : '/health',
        handler : flow(controllers.healthCheck)
    }
]);

const phone = createRouter([
    {
        method  : 'GET',
        path    : '/',
        handler : flow(
            controllers.phone.all,
            withStatus({
                [OK]                    : utils.hasData,
                [NOT_FOUND]             : utils.isEmpty,
                [INTERNAL_SERVER_ERROR] : utils.hasError
            })
        )
    }
]);

module.exports = {
    healthCheck,
    phone
};
