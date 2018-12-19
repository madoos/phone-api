const db = require('./dbClient');
const { phonesApi } = require('./config');
const { always, prop } = require('ramda');
const { calculateOrder, availableStock, isValidOrder } = require('./handler');
const http = require('axios');

const _getPhones = () => http.get(phonesApi.all).then(prop('data'));

const _saveOrder = order => db.models.Order.create(order);

const healthCheck = always({ alive : true });

const createOrder = async ({ customer, phones }) => {
    const stock = await _getPhones();
    const available = availableStock(stock, phones);

    if (isValidOrder(available, phones)) {
        const order = calculateOrder(available);
        return _saveOrder({ customer, ...order });
    }

    return {
        error        : 'INVALID_ORDER',
        msg          : 'Invalid order, some phones not found',
        invalidOrder : true
    };
};

module.exports = {
    healthCheck,
    createOrder
};
