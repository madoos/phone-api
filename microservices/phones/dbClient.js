const config = require('./config');
const DB = require('core').DB;
const dbClient = DB.create(config.db);

module.exports = dbClient;
