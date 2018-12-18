const mocks = require('../__mocks__/_handler')
const {api, user} = mocks.setEnvironment()
const {prop} = require('ramda')
const {UNAUTHORIZED, OK} = require('http-status')

beforeAll(mocks.upDatabase)
afterAll(mocks.tearDownDatabase)

const HEALTH_CHECK_ENDPOINT = '/api/health'

test(`[GET ${HEALTH_CHECK_ENDPOINT}] Should get status 200 for authorized user`, async () => {
    const response = await api
        .get(HEALTH_CHECK_ENDPOINT)
        .set({Authorization : user.token})
        .expect(OK)
        .end()
        .then(prop('body'))

    expect(response).toEqual({alive : true})
})

test(`[GET ${HEALTH_CHECK_ENDPOINT}] Should get status 500 for unauthorized user`, async () => {
    const response = await api
        .get(HEALTH_CHECK_ENDPOINT)
        .set({Authorization : 'invalid-token'})
        .expect(UNAUTHORIZED)
        .end()
        .then(prop('body'))

    expect(response).toEqual({error : 'UNAUTHORIZED'})
})
