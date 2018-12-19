const dao = require('../dao');

module.exports = {
    all : () => dao.findPhones()
};
