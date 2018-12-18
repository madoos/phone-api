const mocks = require('../__mocks__/_handler')
const {api, user, db} = mocks.setEnvironment()
const {prop} = require('ramda')
const {BAD_REQUEST, CREATED} = require('http-status')
const {allToJSON} = require('../app/utils')
const {take} = require('ramda')

beforeAll(mocks.upDatabase)
afterAll(mocks.tearDownDatabase)

const CREATE_ORDER_ENDPOINT = '/api/order'

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
        .send(selected)
        .set({Authorization : user.token})
        .expect(CREATED)
        .end()
        .then(prop('body'))

    expectedProps.forEach(prop => expect(response).toHaveProperty(prop))
    expect(response.phones).toEqual(selected)
})
