const { Joi } = require('express-flow-extensions');
Joi.objectId = require('joi-objectid')(Joi);

const phone = Joi.object().keys({
    _id         : Joi.objectId().required(),
    img         : Joi.string(),
    name        : Joi.string(),
    description : Joi.string(),
    price       : Joi.number().required(),
    __v         : Joi.number()
});
const phones = Joi.array().items(phone);

module.exports = {
    phone,
    phones
};
