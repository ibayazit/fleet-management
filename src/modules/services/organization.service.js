const organizationModel = require('../../database/models/organization.model')

const findById = async (id) => {
    const organization = await organizationModel.findById(id)

    return organization
}

const get = async () => {
    const organizations = await organizationModel.find({})

    return organizations
}

const create = async (data) => {
    const organization = await organizationModel.create(data)

    return organization
}

const updateById = async (id, data) => {
    const organization = await organizationModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })

    return organization
}

const deleteById = async (id) => {
    const organization = await organizationModel.findByIdAndDelete(id)

    return organization
}

module.exports = {
    findById,
    get,
    create,
    updateById,
    deleteById
}