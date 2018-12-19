const request = require('promisify-supertest');
const { OK, NOT_FOUND } = require('http-status');
const server = require('../server');
const api = request(server);
const db = require('../dbClient');
const { prop } = require('ramda');
const API_ENDPOINT = '/phones';

beforeAll(async () => {
    await db.connect();
    await db.clear();
    await db.populate();
});

afterAll(async () => {
    await db.clear();
    await db.close();
});

test(`[GET ${API_ENDPOINT}] Should list all phones with status 200`, async () => {
    const response = await api
        .get(API_ENDPOINT)
        .expect(OK)
        .end()
        .then(prop('body'));

    expect(response).toHaveLength(10);
});

test(`[GET ${API_ENDPOINT}] Should get a empty list with status 404`, async () => {
    await db.clear();

    const response = await api
        .get(API_ENDPOINT)
        .expect(NOT_FOUND)
        .end()
        .then(prop('body'));

    expect(response).toHaveLength(0);
});
