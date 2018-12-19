const config = require('./config');
const DB = require('core/DB');
const dbClient = DB.createOnce(config.db);

module.exports = dbClient;
