const mongoMock = require('./_mongo');
const db = mongoMock.applyToInstanceOnce(require('../app/mongoClient'));
const server = require('../app/server');
const request = require('promisify-supertest');
const api = request(server);
const { user } = require('../app/config');

const setEnvironment = () => ({
    api,
    db,
    user
});

const upDatabase = async () => {
    await db.connect();
    await db.clear();
    await db.populate();
};

const tearDownDatabase = async () => {
    await db.clear();
    await db.close();
};

module.exports = {
    setEnvironment,
    upDatabase,
    tearDownDatabase
};
