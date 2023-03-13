const { ValidationError } = require('express-validation')
const errorHandler = require('./error-handler')

const validationError = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(errorHandler(err))
    }

    return res.status(500).json(err)
}

module.exports = validationError
