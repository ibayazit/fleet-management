const responder = require('../../utils/responder')
const companyService = require('../services/company.service')
const organizationService = require('../services/organization.service')

const getOrganizations = responder(async (req, res) => {
    const organizations = await organizationService.get()

    return {
        data: organizations
    }
})

const createOrganization = responder(async (req, res) => {
    const company = await companyService.findById(req.body.company_id)
    if (!company)
        throw new Error('Company does not exists');

    const organization = await organizationService.create(req.body)

    return {
        data: organization,
        status: 201
    }
})

const getOrganization = responder(async (req, res) => {
    const organization = await organizationService.findById(req.params.id)

    return {
        data: organization,
        status: organization ? 200 : 404
    }
})

const updateOrganization = responder(async (req, res) => {
    const company = await companyService.findById(req.body.company_id)
    if (!company)
        throw new Error('Company does not exists');

    const organization = await organizationService.updateById(req.params.id, req.body)

    return {
        data: organization,
        status: organization ? 200 : 404
    }
})

const deleteOrganization = responder(async (req, res) => {
    const organization = await organizationService.deleteById(req.params.id)

    return {
        data: organization,
        status: organization ? 200 : 404
    }
})

module.exports = {
    getOrganizations,
    getOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization
}