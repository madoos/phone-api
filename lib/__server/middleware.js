const db = require('../mongoClient');
const { UNAUTHORIZED } = require('http-status');
const config = require('../config');
const swaggerUi = require('swagger-ui-express');

const fakeAuthentication = async (req, res, next) => {
    if (req.headers.authorization === config.user.token) {
        req.user = await db.models.User.findOne();
        return next();
    }
    return res.status(UNAUTHORIZED).send({ error : 'UNAUTHORIZED' });
};

const APIDocs = () => {
    return [swaggerUi.serve, swaggerUi.setup(config.server.api)];
};

module.exports = {
    fakeAuthentication,
    APIDocs
};
