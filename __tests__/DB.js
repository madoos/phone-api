const mongoMock = require('../__mocks__/_mongo')
const DB = mongoMock.apply(require('../DB'))

let db
beforeAll(async () => {
    db = DB.create({})
    await db.connect()
})

afterAll(async () => {
    await db.close()
})

test('Should populate database', async () => {
    const {User, Phone, Order} = db.models
    const {user, phones} = await db.populate()

    expect(await User.find()).toHaveLength(1)
    expect(await Phone.find()).toHaveLength(10)
    expect(await Order.find()).toHaveLength(0)
})

test('Should clear fixtures in database', async () => {
    const {User, Phone, Order} = db.models
    const resume = await db.clear()

    expect(await User.find()).toHaveLength(0)
    expect(await Phone.find()).toHaveLength(0)
    expect(await Order.find()).toHaveLength(0)
})

test('.createOnce should create singleton instances', async () => {
    expect(DB.createOnce()).toEqual(DB.createOnce())
})
