const { validate, Joi } = require('express-validation')

const validationRules = {
    body: Joi.object({
        title: Joi.string().required(),
    }),
}

module.exports = validate(validationRules, {}, {})