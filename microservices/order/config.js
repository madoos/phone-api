const { config } = require('core');
const { join } = require('path');
const YAML = require('yamljs');
const crypto = require('crypto');
const api = YAML.load(join(__dirname, './swagger.yml'));

module.exports = {
    ...config,
    user : {
        token : process.env.USER_TOKEN || crypto.randomBytes(16).toString('hex')
    },
    server : {
        port : process.env.SERVER_PORT || 3001,
        api
    },
    phonesApi : {
        all : process.env.API_PHONES_ALL || 'http://localhost:3000/phones'
    }
};
