const {
    hasData,
    hasError,
    asyncMapParallel,
    projectPaths
} = require('./utils');

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

test('.projectPaths should apply path transformations', async () => {
    const src = { a : { b : { c : [1, 2, 3] } }, b : 1 };
    const result = projectPaths({ 'a.b.c' : x => x.length })(src);

    expect(result).toEqual({
        a : { b : { c : 3 } },
        b : 1
    });

    expect(src.a.b.c).toEqual([1, 2, 3]);
});
