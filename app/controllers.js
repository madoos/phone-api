const dao = require('./dao');
const { always } = require('ramda');

const phone = {
    all : () => dao.findPhones()
};

const healthCheck = always({ alive : true });

module.exports = {
    healthCheck,
    phone
};
