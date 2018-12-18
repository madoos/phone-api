const mongoose = require('mongoose');
const schemas = require('./schemas');
const fixtures = require('../__fixtures__');
const { asyncMapParallel } = require('../app/utils');

let _singletonInstance;

class DB {
    constructor({ url, options = {} }) {
        this._url = url;
        this._options = options;
        this._odm = mongoose;
        this.schemas = schemas;
        this.models = {};
        this.connection = null;
    }

    static create(...args) {
        return new DB(...args);
    }

    static createOnce(opt) {
        if (_singletonInstance) {
            return _singletonInstance;
        }
        _singletonInstance = DB.create(opt);
        return _singletonInstance;
    }

    async connect() {
        const options = Object.assign({ useNewUrlParser : true }, this._options);
        this.connection = mongoose.createConnection(this._url, options);

        const doModels = (models, [name, schema]) => ({
            ...models,
            [name] : this.connection.model(name, schema)
        });

        const models = Object.entries(this.schemas).reduce(doModels, {});
        this.models = models;
        return this;
    }

    async close() {
        this.connection && this.connection.close();
        return this;
    }

    async populate() {
        const { User, Phone } = this.models;
        const createPhone = phone => Phone.create(phone);

        return {
            user   : await User.create(fixtures.user()),
            phones : await asyncMapParallel(createPhone, fixtures.phones(10))
        };
    }

    async clear() {
        const deleted = {};
        const models = this.models;

        for (let modelName of Object.keys(models)) {
            deleted[modelName] = await models[modelName].deleteMany({});
        }

        return deleted;
    }
}

module.exports = DB;
