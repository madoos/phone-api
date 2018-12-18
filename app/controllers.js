const dao = require('./dao');

const phone = {
    all : () => dao.findPhones()
};

module.exports = {
    phone
};
