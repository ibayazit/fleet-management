const companyModel = require('../../database/models/company.model')

const findById = async (id) => {
    const company = await companyModel.findById(id)

    return company
}

const get = async () => {
    const companies = await companyModel.find({})

    return companies
}

const create = async (data) => {
    const company = await companyModel.create(data)

    return company
}

const updateById = async (id, data) => {
    const company = await companyModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })

    return company
}

const deleteById = async (id) => {
    const company = await companyModel.findByIdAndDelete(id)

    return company
}

module.exports = {
    findById,
    get,
    create,
    updateById,
    deleteById
}