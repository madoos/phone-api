const { EOL } = require('os');
const { curry } = require('ramda');
const { complement, isEmpty, is, allPass } = require('ramda');

const debug = curry((tag, data) => {
    process.stdout.write(tag);
    process.stdout.write(EOL);
    process.stdout.write(JSON.stringify(data, null, 2));
    process.stdout.write(EOL);
});

const hasError = is(Error);
const notEmpty = complement(isEmpty);
const hasData = allPass([complement(hasError), notEmpty]);

module.exports = {
    debug,
    isEmpty,
    hasData,
    hasError
};
