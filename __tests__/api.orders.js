const mocks = require('../__mocks__/_handler')
const {api, user, db} = mocks.setEnvironment()
const {prop} = require('ramda')
const {BAD_REQUEST, CREATED, UNPROCESSABLE_ENTITY} = require('http-status')
const {allToJSON} = require('../app/utils')
const {take} = require('ramda')

beforeAll(mocks.upDatabase)
afterAll(mocks.tearDownDatabase)

const CREATE_ORDER_ENDPOINT = '/api/orders'

test(`[POST ${CREATE_ORDER_ENDPOINT}] Should respond bad request when the data do not correspond with phones`, async () => {
    const response = await api
        .post(CREATE_ORDER_ENDPOINT, ['foo', 'baz'])
        .type('json')
        .set({Authorization : user.token})
        .expect(BAD_REQUEST)
        .end()
})

test(`[POST ${CREATE_ORDER_ENDPOINT}] Should respond created`, async () => {
    const phones = await db.models.Phone.find().then(allToJSON)
    const selected = take(2, phones)
    const expectedProps = ['_id', 'customer', 'total', 'phones']

    const response = await api
        .post(CREATE_ORDER_ENDPOINT)
        .send({data : selected})
        .set({Authorization : user.token})
        .expect(CREATED)
        .end()
        .then(prop('body'))

    expectedProps.forEach(prop => expect(response).toHaveProperty(prop))
    expect(response.phones).toEqual(selected)
})

test(`[POST ${CREATE_ORDER_ENDPOINT}] Should respond invalid order`, async () => {
    const selected = [
        {
            _id         : '5c1919d8b673389f9b9bc5ff',
            img         : 'http://lorempixel.com/640/480',
            name        : 'quod totam eius',
            description : 'Eius quia quia aut.',
            price       : 10.1
        }
    ]

    const response = await api
        .post(CREATE_ORDER_ENDPOINT)
        .send({data : selected})
        .set({Authorization : user.token})
        .expect(UNPROCESSABLE_ENTITY)
        .end()
        .then(prop('body'))

    expect(response).toEqual({
        error        : 'INVALID_ORDER',
        msg          : 'Invalid order, some phones not found',
        invalidOrder : true
    })
})
