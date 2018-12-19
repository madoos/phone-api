const { allToJSON } = require('core').utils;
const db = require('../dbClient');

const axios = {
    get : async () => {
        return {
            data : await db.models.Phone.find().then(allToJSON)
        };
    }
};

module.exports = axios;
