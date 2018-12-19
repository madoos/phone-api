jest.mock('axios');
const db = require('../dbClient');
const { allToJSON } = require('core').utils;
const { take, prop } = require('ramda');
const { BAD_REQUEST, CREATED, UNPROCESSABLE_ENTITY } = require('http-status');
const request = require('promisify-supertest');
const server = require('../server');
const api = request(server);
const { user } = require('../config');
const CREATE_ORDER_ENDPOINT = '/orders';

beforeAll(async () => {
    await db.connect();
    await db.clear();
    await db.populate();
});

afterAll(async () => {
    await db.clear();
    await db.close();
});

test(`[POST ${CREATE_ORDER_ENDPOINT}] Should respond bad request when the data do not correspond with phones`, async () => {
    await api
        .post(CREATE_ORDER_ENDPOINT, ['foo', 'baz'])
        .type('json')
        .set({ Authorization : user.token })
        .expect(BAD_REQUEST)
        .end();
});

test(`[POST ${CREATE_ORDER_ENDPOINT}] Should respond created`, async () => {
    const phones = await db.models.Phone.find().then(allToJSON);
    const selected = take(2, phones);
    const expectedProps = ['_id', 'customer', 'total', 'phones'];

    const response = await api
        .post(CREATE_ORDER_ENDPOINT)
        .send({ data : selected })
        .set({ Authorization : user.token })
        .expect(CREATED)
        .end()
        .then(prop('body'));

    expectedProps.forEach(key => expect(response).toHaveProperty(key));
    expect(response.phones).toEqual(selected);
});

test(`[POST ${CREATE_ORDER_ENDPOINT}] Should respond invalid order`, async () => {
    const selected = [
        {
            _id         : '5c1919d8b673389f9b9bc5ff',
            img         : 'http://lorempixel.com/640/480',
            name        : 'quod totam eius',
            description : 'Eius quia quia aut.',
            price       : 10.1
        }
    ];

    const response = await api
        .post(CREATE_ORDER_ENDPOINT)
        .send({ data : selected })
        .set({ Authorization : user.token })
        .expect(UNPROCESSABLE_ENTITY)
        .end()
        .then(prop('body'));

    expect(response).toEqual({
        error        : 'INVALID_ORDER',
        msg          : 'Invalid order, some phones not found',
        invalidOrder : true
    });
});
