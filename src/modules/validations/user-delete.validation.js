const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
}

module.exports = validate(validationRules, {}, {})