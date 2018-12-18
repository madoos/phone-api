const MongoDB = require('mongodb-memory-server').default;
const { once } = require('ramda');

const createMongoMock = () => {
    return new MongoDB({
        instance : {
            dbName : 'masmovil'
        },
        binary : {
            version : '3.2.19'
        }
    });
};

const applyToInstance = instance => {
    const _mongoMock = createMongoMock();
    const _connect = instance.connect;
    const _close = instance.close;
    instance.mongoMock = _mongoMock;

    instance.connect = async function connectMock() {
        this._url = await _mongoMock.getConnectionString();
        _connect.call(this);
        return this;
    };

    instance.close = async function() {
        await _close.call(this);
        _mongoMock.stop();
    };

    return instance;
};

const apply = DB => {
    let mongoMockSingleton;

    const MockDB = new Proxy(DB, {
        construct(Target, args) {
            const instance = new Target(...args);
            return applyToInstance(instance);
        }
    });

    MockDB.create = (options = {}) => new MockDB(options);

    MockDB.createOnce = (options = {}) => {
        if (mongoMockSingleton) {
            return mongoMockSingleton;
        }
        mongoMockSingleton = MockDB.create(options);
        return mongoMockSingleton;
    };
    return MockDB;
};

const applyToInstanceOnce = once(applyToInstance);

module.exports = {
    createMongoMock,
    apply,
    applyToInstance,
    applyToInstanceOnce
};
