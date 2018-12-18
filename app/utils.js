const { EOL } = require('os');
const {
    complement,
    isEmpty,
    is,
    allPass,
    curry,
    pipe,
    map,
    assocPath,
    clone,
    split,
    path,
    propEq
} = require('ramda');

const asyncMapParallel = curry((f, xs) => {
    const requests = xs.map(f);
    return Promise.all(requests);
});

const hasError = is(Error);

const debug = curry((tag, data) => {
    process.stdout.write(tag);
    process.stdout.write(EOL);
    process.stdout.write(
        hasError(data) ? data.stack : JSON.stringify(data, null, 2)
    );
    process.stdout.write(EOL);
});

const notEmpty = complement(isEmpty);
const hasData = allPass([complement(hasError), notEmpty]);

const toJson = pipe(
    JSON.stringify,
    JSON.parse
);

const allToJSON = map(toJson);

const projectPaths = curry((descriptor, data) => {
    return Object.entries(descriptor).reduce((src, [key, transformer]) => {
        const route = split('.', key);
        const value = transformer(path(route, src));
        return assocPath(route, value, src);
    }, clone(data));
});

const isInvalidOrder = propEq('invalidOrder', true);

const isValidOrder = order => !!order._id;

module.exports = {
    debug,
    isEmpty,
    hasData,
    hasError,
    asyncMapParallel,
    toJson,
    allToJSON,
    projectPaths,
    isInvalidOrder,
    isValidOrder
};
