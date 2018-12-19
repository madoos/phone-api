const phonesController = require('./phone');
const { allToJSON } = require('../utils');
const {
    calculateOrder,
    availableStock,
    isValidOrder
} = require('./order.handler');
const dao = require('../dao');

const create = async ({ customer, phones }) => {
    const stock = await phonesController.all().then(allToJSON);
    const available = availableStock(stock, phones);

    if (isValidOrder(available, phones)) {
        const order = calculateOrder(available);
        return dao.saveOrder({ customer, ...order });
    }

    return {
        error        : 'INVALID_ORDER',
        msg          : 'Invalid order, some phones not found',
        invalidOrder : true
    };
};

module.exports = {
    create
};
