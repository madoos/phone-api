const config = require('./config');
const db = require('../DB').createOnce(config.db);

module.exports = db;
