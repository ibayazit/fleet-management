const { validate, Joi } = require('express-validation')

const validationRules = {
    body: Joi.object({
        organization_id: Joi.string().hex().length(24).required(),
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        credit: Joi.number().min(0).required(),
    }),
}

module.exports = validate(validationRules, {}, {})