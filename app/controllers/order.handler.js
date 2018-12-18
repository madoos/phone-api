const { innerJoin, eqProps, add, prop, reduce, map, pipe } = require('ramda');

const sumPrices = pipe(
    map(prop('price')),
    reduce(add, 0)
);

const calculateOrder = (stock, phones) => {
    const available = innerJoin(eqProps('_id'), stock, phones);
    return { phones : available, total : sumPrices(available) };
};

module.exports = {
    calculateOrder,
    sumPrices
};
