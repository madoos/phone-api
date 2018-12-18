const db = require('./mongoClient');

const findPhones = (query = {}) => db.models.Phone.find(query);

const saveOrder = order => db.models.Order.create(order);

module.exports = {
    findPhones,
    saveOrder
};
