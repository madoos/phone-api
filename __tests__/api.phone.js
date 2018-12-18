const mocks = require('../__mocks__/_handler')
const {api, user, db} = mocks.setEnvironment()
const {prop} = require('ramda')

beforeAll(mocks.upDatabase)
afterAll(mocks.tearDownDatabase)

const ALL_PHONES_ENDPOINT = '/api/phone'

test(`[GET ${ALL_PHONES_ENDPOINT}] Should list all phones with status 200`, async () => {
    const response = await api
        .get(ALL_PHONES_ENDPOINT)
        .set({Authorization : user.token})
        .expect(200)
        .end()
        .then(prop('body'))

    expect(response).toHaveLength(10)
})

test(`[GET ${ALL_PHONES_ENDPOINT}] Should get a empty list with status 404`, async () => {
    await db.clear()

    const response = await api
        .get(ALL_PHONES_ENDPOINT)
        .set({Authorization : user.token})
        .expect(404)
        .end()
        .then(prop('body'))

    expect(response).toHaveLength(0)
})
