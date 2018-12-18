const { debug } = require('./utils');
const config = require('./config');
const DB = require('../DB');
const server = require('./server');
const { projectPaths } = require('./utils');

const start = async opt => {
    const db = DB.createOnce(opt.db);
    await db.connect();
    await server.listenAsync(opt.server.port);
    return opt;
};

start(config)
    .then(
        projectPaths({
            'server.api.paths'       : Object.keys,
            'server.api.definitions' : Object.keys
        })
    )
    .then(debug('App started with config:'))
    .catch(debug('Error started app:'));
