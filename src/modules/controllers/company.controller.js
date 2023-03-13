const responder = require('../../utils/responder')
const companyService = require('../services/company.service')

const getCompanies = responder(async (req, res) => {
    const companies = await companyService.get()

    return {
        data: companies
    }
})

const createCompany = responder(async (req, res) => {
    const company = await companyService.create(req.body)

    return {
        data: company,
        status: 201
    }
})

const getCompany = responder(async (req, res) => {
    const company = await companyService.findById(req.params.id)

    return {
        data: company,
        status: company ? 200 : 404
    }
})

const updateCompany = responder(async (req, res) => {
    const company = await companyService.updateById(req.params.id, req.body)

    return {
        data: company,
        status: company ? 200 : 404
    }
})

const deleteCompany = responder(async (req, res) => {
    const company = await companyService.deleteById(req.params.id)

    return {
        data: company,
        status: company ? 200 : 404
    }
})

module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}