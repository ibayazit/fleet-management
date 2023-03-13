const { validate, Joi } = require('express-validation')

const validationRules = {
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    }),
    body: Joi.object({
        company_id: Joi.string().hex().length(24).required(),
        title: Joi.string().required(),
        battery: Joi.number().min(0).required(),
        charging_fee: Joi.number().min(0).required(),
    }),
}

module.exports = validate(validationRules, {}, {})