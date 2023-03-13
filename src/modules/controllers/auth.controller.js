const responder = require('../../utils/responder')
const userService = require('../services/user.service')
const { generateAccessToken } = require('../../utils/jwt')

const authAttempt = responder(async (req, res) => {
    const user = await userService.findByEmail(req.body.email)

    if(!user){
        throw new Error('User not found or password does not match');
    }

    const checkPassword = await user.comparePassword(req.body.password)

    if(!checkPassword){
        throw new Error('User not found or password does not match');
    }

    return {
        data: {
            user: {
                _id: user._id,
                organization_id: user.organization_id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                createdAt: user.createdAt
            },
            access_token: generateAccessToken(user.toObject())
        },
        status: user ? 200 : 404
    }
})

const authUser = responder(async (req, res) => {

    return {
        data: req.user
    }
})

module.exports = {
    authAttempt,
    authUser
}