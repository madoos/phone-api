const { asyncMapParallel } = require('./utils');

test('.AsyncMapParallel should map async functions in parallel', async () => {
    const asyncPlus = n => Promise.resolve(n + 1);
    const mapped = await asyncMapParallel(asyncPlus)([1, 2, 3]);
    expect(mapped).toEqual([2, 3, 4]);
});
