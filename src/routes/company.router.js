const express = require('express')
const router = express.Router()
const { getCompanies, getCompany, createCompany, updateCompany, deleteCompany } = require('../modules/controllers/company.controller')

// Validations
const createValidation = require('../modules/validations/company-create.validation')
const updateValidation = require('../modules/validations/company-update.validation')
const deleteValidation = require('../modules/validations/company-delete.validation')

router.route('/')
    .get(getCompanies)
    .post(createValidation, createCompany)

router.route('/:id')
    .get(getCompany)
    .patch(updateValidation, updateCompany)
    .delete(deleteValidation, deleteCompany)

module.exports = router