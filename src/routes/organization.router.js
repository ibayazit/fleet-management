const express = require('express')
const router = express.Router()
const { getOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization } = require('../modules/controllers/organization.controller')

// Validations
const createValidation = require('../modules/validations/organization-create.validation')
const updateValidation = require('../modules/validations/organization-update.validation')
const deleteValidation = require('../modules/validations/organization-delete.validation')

router.route('/')
    .get(getOrganizations)
    .post(createValidation, createOrganization)

router.route('/:id')
    .get(getOrganization)
    .patch(updateValidation, updateOrganization)
    .delete(deleteValidation, deleteOrganization)

module.exports = router