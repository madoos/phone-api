const {
    calculateOrder,
    sumPrices,
    availableStock,
    isValidOrder
} = require('./order.handler');

test('.sumPrices should sum prices', () => {
    expect(sumPrices([{ price : 10 }, { price : 20 }])).toEqual(30);
    expect(sumPrices([{ price : 10 }])).toEqual(10);
    expect(sumPrices([])).toEqual(0);
});

test('.calculateOrder should make a order data', () => {
    const phones = [
        { _id : 'a1', price : 10 },
        { _id : 'a2', price : 20 },
        { _id : 'b2', price : 20 }
    ];

    const order = calculateOrder(phones);

    expect(order).toEqual({
        phones : [
            { _id : 'a1', price : 10 },
            { _id : 'a2', price : 20 },
            { _id : 'b2', price : 20 }
        ],
        total : 50
    });
});

test('.availableStock should get the available stock', () => {
    const phones = [{ _id : 'a1', price : 10 }];

    const stock = [
        { _id : 'a1', price : 10 },
        { _id : 'a2', price : 20 },
        { _id : 'b2', price : 20 }
    ];

    expect(availableStock(stock, phones)).toEqual([{ _id : 'a1', price : 10 }]);
    expect(availableStock(stock, [])).toEqual([]);
});

test('.isValidOrder should return a boolean ', () => {
    const phones = [{ _id : 'a1', price : 10 }];
    const stock = [{ _id : 'a1', price : 10 }];

    expect(isValidOrder(phones, stock)).toEqual(true);
    expect(isValidOrder(phones, [])).toEqual(false);
});
