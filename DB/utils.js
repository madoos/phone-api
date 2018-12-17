const { curry } = require('ramda');

const asyncMapParallel = curry(async (f, xs) => {
    const requests = xs.map(f);
    return Promise.all(requests);
});

module.exports = {
    asyncMapParallel
};
