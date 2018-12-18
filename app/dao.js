const db = require('./mongoClient');

const findPhones = (query = {}) => db.models.Phone.find(query);

module.exports = {
    findPhones
};
