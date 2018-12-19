const { config } = require('core');
const { join } = require('path');
const YAML = require('yamljs');
const api = YAML.load(join(__dirname, './swagger.yml'));

module.exports = {
    ...config,
    server : {
        port : process.env.SERVER_PORT || 3000,
        api
    }
};
