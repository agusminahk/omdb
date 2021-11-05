const Joi = require('joi');

const joiSchema = Joi.object({
    username: Joi.string().min(3).max(30),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),

    // age: Joi.number().integer().min(10).max(90),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ar'] } }),
});

module.exports = joiSchema;
