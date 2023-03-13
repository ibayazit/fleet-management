const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    }),
    body: Joi.object({
        title: Joi.string(),
    }),
}

module.exports = validate(validationRules, {}, {})