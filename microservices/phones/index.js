const { DB } = require('core');
const { debug, projectPaths } = require('core/lib/utils');
const server = require('./server');
const config = require('./config');

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
    .then(debug('Phone app started with config:'))
    .catch(debug('Error started Phone app:'));
