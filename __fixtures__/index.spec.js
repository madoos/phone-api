const fixtures = require('./');

test('Should create a user fixtures', () => {
    const user = fixtures.user();

    expect(user).toEqual({
        name    : expect.any(String),
        surname : expect.any(String),
        email   : expect.any(String)
    });
});

test('Should create a phone fixtures', () => {
    const phone = fixtures.phone();

    expect(phone).toEqual({
        img         : expect.any(String),
        name        : expect.any(String),
        description : expect.any(String),
        price       : expect.any(Number)
    });
});
