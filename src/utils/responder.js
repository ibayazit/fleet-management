const errorHandler = require('./error-handler')

const responder = fn => {
    return async (req, res, next) => {
        try {
            const response = await fn(req, res, next)

            res.status(response.status ?? 200).json({
                message: response.message ?? 'Request executed successfully',
                data: response.data ?? []
            })
        } catch (error) {
            res.status(400).json(errorHandler(error))
        }
    }
}

module.exports = responder