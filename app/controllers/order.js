const phonesController = require('./phone');
const { allToJSON } = require('../utils');
const { calculateOrder } = require('./order.handler');
const dao = require('../dao');

const create = async ({ customer, phones }) => {
    const stock = await phonesController.all().then(allToJSON);
    const order = calculateOrder(stock, phones);
    return dao.saveOrder({ customer, ...order });
};

module.exports = {
    create
};
