const mocks = require('../__mocks__/_handler')
const {api, user, db} = mocks.setEnvironment()
const {prop} = require('ramda')
const {OK, NOT_FOUND} = require('http-status')

beforeAll(mocks.upDatabase)
afterAll(mocks.tearDownDatabase)

const ALL_PHONES_ENDPOINT = '/api/phones'

test(`[GET ${ALL_PHONES_ENDPOINT}] Should list all phones with status 200`, async () => {
    const response = await api
        .get(ALL_PHONES_ENDPOINT)
        .set({Authorization : user.token})
        .expect(OK)
        .end()
        .then(prop('body'))

    expect(response).toHaveLength(10)
})

test(`[GET ${ALL_PHONES_ENDPOINT}] Should get a empty list with status 404`, async () => {
    await db.clear()

    const response = await api
        .get(ALL_PHONES_ENDPOINT)
        .set({Authorization : user.token})
        .expect(NOT_FOUND)
        .end()
        .then(prop('body'))

    expect(response).toHaveLength(0)
})
