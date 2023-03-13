const responder = require('../../utils/responder')
const organizationService = require('../services/organization.service')
const userService = require('../services/user.service')

const getUsers = responder(async (req, res) => {
    const users = await userService.get()

    return {
        data: users
    }
})

const createUser = responder(async (req, res) => {
    const organization = await organizationService.findById(req.body.organization_id)
    if (!organization)
        throw new Error('Organization does not exists');

    const user = await userService.create(req.body)

    return {
        data: user,
        status: 201
    }
})

const getUser = responder(async (req, res) => {
    const user = await userService.findById(req.params.id)

    return {
        data: user,
        status: user ? 200 : 404
    }
})

const updateUser = responder(async (req, res) => {
    const organization = await organizationService.findById(req.body.organization_id)
    if (!organization)
        throw new Error('Organization does not exists');

    const user = await userService.updateById(req.params.id, req.body)

    return {
        data: user,
        status: user ? 200 : 404
    }
})

const deleteUser = responder(async (req, res) => {
    const user = await userService.deleteById(req.params.id)

    return {
        data: user,
        status: user ? 200 : 404
    }
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}