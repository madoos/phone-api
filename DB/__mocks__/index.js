const MongoDB = require('mongodb-memory-server').default;
const DB = require('../');
const { once } = require('ramda');

const createMongoDBMock = () => {
    return new MongoDB({
        instance : {
            dbName : 'masmovil'
        },
        binary : {
            version : '3.2.19'
        }
    });
};

const mockInstance = instance => {
    const _mongoMock = createMongoDBMock();
    const _connect = instance.connect;
    const _close = instance.close;
    instance.mongoMock = _mongoMock;

    instance.connect = async function connectMock() {
        this._url = await _mongoMock.getConnectionString();
        _connect.call(this);
        return this;
    };

    instance.close = async function() {
        _close.call(this);
        _mongoMock.stop();
    };

    return instance;
};

const MockDB = new Proxy(DB, {
    construct(Target, args) {
        const instance = new Target(...args);
        return mockInstance(instance);
    }
});

MockDB.create = function(...args) {
    return new MockDB(...args);
};

MockDB.instance = mockInstance;

MockDB.singleton = once(mockInstance);

module.exports = MockDB;
