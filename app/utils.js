const { EOL } = require('os');
const { curry } = require('ramda');

const debug = curry((tag, data) => {
    process.stdout.write(tag);
    process.stdout.write(EOL);
    process.stdout.write(JSON.stringify(data, null, 2));
    process.stdout.write(EOL);
});

module.exports = { debug };
