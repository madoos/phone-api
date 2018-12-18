const expressExtensions = require('express-flow-extensions');
const { createRouter, withStatus, flow } = expressExtensions;
const utils = require('./utils');
const controllers = require('./controllers');

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
    phone
};
