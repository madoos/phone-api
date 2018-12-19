const db = require('./dbClient');
const getPhones = () => db.models.Phone.find();

module.exports = {
    getPhones
};
