const MongoDB = require('mongodb-memory-server').default;

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

const apply = DB => {
    const MockDB = new Proxy(DB, {
        construct(Target, args) {
            const instance = new Target(...args);
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
        }
    });

    MockDB.create = (options = {}) => new MockDB(options);
    return MockDB;
};

module.exports = {
    createMongoMock,
    apply
};
