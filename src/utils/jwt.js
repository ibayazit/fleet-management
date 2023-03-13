const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401).json({
            message: 'Unauthorized',
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Forbidden',
            })
        }

        req.user = {
            _id: user._id,
            organization_id: user.organization_id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            createdAt: user.createdAt
        }

        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}