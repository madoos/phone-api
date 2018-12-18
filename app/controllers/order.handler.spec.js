const { calculateOrder, sumPrices } = require('./order.handler');

test('.sumPrices should sum prices', () => {
    expect(sumPrices([{ price : 10 }, { price : 20 }])).toEqual(30);
    expect(sumPrices([{ price : 10 }])).toEqual(10);
    expect(sumPrices([])).toEqual(0);
});

test('.calculateOrder should make a order data', () => {
    const stock = [
        { _id : 'a1', price : 10 },
        { _id : 'a2', price : 20 },
        { _id : 'a3', price : 30 }
    ];

    const phones = [
        { _id : 'a1', price : 10 },
        { _id : 'a2', price : 20 },
        { _id : 'b2', price : 20 }
    ];

    const order = calculateOrder(stock, phones);

    expect(order).toEqual({
        phones : [{ _id : 'a1', price : 10 }, { _id : 'a2', price : 20 }],
        total  : 30
    });
});
