const { debug } = require('./utils');
const config = require('./config');
const DB = require('../DB');
const server = require('./server');

const start = async opt => {
    const db = DB.createOnce(opt.db);
    await db.connect();
    await server.listenAsync(opt.server.port);
    return opt;
};

start(config)
    .then(debug('App started whit config:'))
    .catch(debug('Error started app:'));
