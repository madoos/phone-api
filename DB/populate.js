const db = require('../lib/mongoClient');
const { debug } = require('../lib/utils');
const { projection } = require('express-flow-extensions');
const { prop, map, pipe, always } = require('ramda');

const populate = async () => {
    await db.connect();
    await db.clear();
    const fixtures = await db.populate();
    await db.close();
    return fixtures;
};

populate()
    .then(
        projection({
            user   : 'user',
            phones : pipe(
                prop('phones'),
                map(prop('_id'))
            ),
            orders : always([])
        })
    )
    .then(debug('Populated database:'))
    .catch(debug('Error populating database'));
