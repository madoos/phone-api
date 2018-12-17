const { Schema } = require('mongoose');

const User = new Schema({
    name    : String,
    surname : String,
    email   : String
});

const Phone = new Schema({
    img         : String,
    name        : String,
    description : String,
    price       : Number
});

const Order = new Schema({
    customer : User,
    phones   : [Phone],
    total    : Number
});

module.exports = {
    User,
    Phone,
    Order
};
