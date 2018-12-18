const { EOL } = require('os');
const { complement, isEmpty, is, allPass, curry, pipe, map } = require('ramda');

const asyncMapParallel = curry((f, xs) => {
    const requests = xs.map(f);
    return Promise.all(requests);
});

const debug = curry((tag, data) => {
    process.stdout.write(tag);
    process.stdout.write(EOL);
    process.stdout.write(JSON.stringify(data, null, 2));
    process.stdout.write(EOL);
});

const hasError = is(Error);
const notEmpty = complement(isEmpty);
const hasData = allPass([complement(hasError), notEmpty]);

const toJson = pipe(
    JSON.stringify,
    JSON.parse
);

const allToJSON = map(toJson);

module.exports = {
    debug,
    isEmpty,
    hasData,
    hasError,
    asyncMapParallel,
    toJson,
    allToJSON
};
