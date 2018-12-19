const { innerJoin, eqProps, add, prop, reduce, map, pipe } = require('ramda');

const sumPrices = pipe(
    map(prop('price')),
    reduce(add, 0)
);

const availableStock = (stock, phones) => {
    return innerJoin(eqProps('_id'), stock, phones);
};

const calculateOrder = phones => {
    return { phones : phones, total : sumPrices(phones) };
};

const isValidOrder = (availablePhones, phones) => {
    return availablePhones.length === phones.length;
};

module.exports = {
    availableStock,
    calculateOrder,
    isValidOrder,
    sumPrices
};
