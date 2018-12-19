const crypto = require('crypto');
const { join } = require('path');
const YAML = require('yamljs');
const api = YAML.load(join(__dirname, '../swagger.yml'));

module.exports = {
    user : {
        token : process.env.USER_TOKEN || crypto.randomBytes(16).toString('hex')
    },
    db : {
        url : process.env.DB_URL || 'mongodb://0.0.0.0:27017/masmovil'
    },
    server : {
        port : process.env.SERVER_PORT || 3000,
        api
    }
};
