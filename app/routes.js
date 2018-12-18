const expressExtensions = require('express-flow-extensions');
const { createRouter, withStatus, flow } = expressExtensions;
const utils = require('./utils');
const controllers = require('./controllers');

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
                200 : utils.hasData,
                404 : utils.isEmpty,
                500 : utils.hasError
            })
        )
    }
]);

module.exports = {
    healthCheck,
    phone
};
