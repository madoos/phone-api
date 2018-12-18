const db = require('../mongoClient');
const { UNAUTHORIZED } = require('http-status');
const config = require('../config');

const fakeAuthentication = async (req, res, next) => {
    if (req.headers.authorization === config.user.token) {
        req.user = await db.models.User.findOne();
        return next();
    }
    return res.status(UNAUTHORIZED).send({ error : 'UNAUTHORIZED' });
};

module.exports = {
    fakeAuthentication
};
