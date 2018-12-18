const { hasData, hasError, asyncMapParallel } = require('./utils');

test('.hasData should return true when contains data', () => {
    expect(hasData(new Error())).toEqual(false);
    expect(hasData([])).toEqual(false);
    expect(hasData({})).toEqual(false);
    expect(hasData('')).toEqual(false);
    expect(hasData(['foo'])).toEqual(true);
    expect(hasData({ foo : 'baz' })).toEqual(true);
    expect(hasData('foo')).toEqual(true);
});

test('.hasError should return true when data is instance of error', () => {
    expect(hasError([])).toEqual(false);
    expect(hasError({})).toEqual(false);
    expect(hasError(new Error())).toEqual(true);
});

test('.AsyncMapParallel should map async functions in parallel', async () => {
    const asyncPlus = n => Promise.resolve(n + 1);
    const mapped = await asyncMapParallel(asyncPlus)([1, 2, 3]);
    expect(mapped).toEqual([2, 3, 4]);
});
