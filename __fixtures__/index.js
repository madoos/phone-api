const faker = require('faker');
const { times } = require('ramda');

const user = () => ({
    name    : faker.name.firstName(),
    surname : faker.name.lastName(),
    email   : faker.internet.email()
});

const phone = () => ({
    img         : faker.image.imageUrl(),
    name        : faker.lorem.words(),
    description : faker.lorem.text(),
    price       : Number(faker.commerce.price())
});

const users = times(user);
const phones = times(phone);

module.exports = {
    user,
    users,
    phone,
    phones
};
