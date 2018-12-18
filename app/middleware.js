const db = require('./mongoClient');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const config = require('./config');

const fakeAuthentication = async (req, res, next) => {
    if (req.headers.authorization === config.user.token) {
        req.user = await db.models.User.findOne();
        return next();
    }
    return res.status(INTERNAL_SERVER_ERROR).send('UNAUTHORIZED');
};

module.exports = {
    fakeAuthentication
};
