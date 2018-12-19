const { debug, projectPaths } = require('core/lib/utils');
const config = require('./config');
const db = require('./dbClient');
const server = require('./server');

const start = async opt => {
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
