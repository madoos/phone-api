const mongoMock = require('../__mocks__/_mongo')
const db = mongoMock.applyToInstanceOnce(require('../app/mongoClient'))
const server = require('../app/server')
const request = require('promisify-supertest')
const api = request(server)
const {prop} = require('ramda')

beforeAll(async () => {
    await db.connect()
    await db.clear()
    await db.populate()
})

afterAll(async () => {
    await db.clear()
    await db.close()
})

const ALL_PHONES_ENDPOINT = '/api/phone'

test(`[${ALL_PHONES_ENDPOINT}] Should list all phones with status 200`, async () => {
    const response = await api
        .get(ALL_PHONES_ENDPOINT)
        // .set({Authorization: token})
        .expect(200)
        .end()
        .then(prop('body'))

    expect(response).toHaveLength(10)
})

test(`[${ALL_PHONES_ENDPOINT}] Should get a empty list with status 404`, async () => {
    await db.clear()

    const response = await api
        .get(ALL_PHONES_ENDPOINT)
        // .set({Authorization: token})
        .expect(404)
        .end()
        .then(prop('body'))

    expect(response).toHaveLength(0)
})
