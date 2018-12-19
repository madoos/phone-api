const request = require('promisify-supertest');
const { UNAUTHORIZED, OK } = require('http-status');
const server = require('../server');
const api = request(server);
const { prop } = require('ramda');
const { user } = require('../config');
const HEALTH_CHECK_ENDPOINT = '/health';

const db = require('../dbClient'); // for get user in auth middleware

beforeAll(async () => {
    await db.connect();
    await db.clear();
    await db.populate();
});

afterAll(async () => {
    await db.clear();
    await db.close();
});

test(`[GET ${HEALTH_CHECK_ENDPOINT}] Should get status 200 for authorized user`, async () => {
    const response = await api
        .get(HEALTH_CHECK_ENDPOINT)
        .set({ Authorization : user.token })
        .expect(OK)
        .end()
        .then(prop('body'));

    expect(response).toEqual({ alive : true });
});

test(`[GET ${HEALTH_CHECK_ENDPOINT}] Should get status 500 for unauthorized user`, async () => {
    const response = await api
        .get(HEALTH_CHECK_ENDPOINT)
        .set({ Authorization : 'invalid-token' })
        .expect(UNAUTHORIZED)
        .end()
        .then(prop('body'));

    expect(response).toEqual({ error : 'UNAUTHORIZED' });
});
