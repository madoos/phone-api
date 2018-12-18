const mocks = require('../__mocks__/_handler')
const {api, user} = mocks.setEnvironment()
const {prop} = require('ramda')

beforeAll(mocks.upDatabase)
afterAll(mocks.tearDownDatabase)

const HEALTH_CHECK_ENDPOINT = '/api/health'

test(`[GET ${HEALTH_CHECK_ENDPOINT}] Should get status 200 for authorized user`, async () => {
    const response = await api
        .get(HEALTH_CHECK_ENDPOINT)
        .set({Authorization : user.token})
        .expect(200)
        .end()
        .then(prop('body'))

    expect(response).toEqual({alive : true})
})

test(`[GET ${HEALTH_CHECK_ENDPOINT}] Should get status 500 for unauthorized user`, async () => {
    const response = await api
        .get(HEALTH_CHECK_ENDPOINT)
        .set({Authorization : 'invalid-token'})
        .expect(500)
        .end()
        .then(prop('text'))

    expect(response).toEqual('UNAUTHORIZED')
})
