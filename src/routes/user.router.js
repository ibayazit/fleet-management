const express = require('express')
const router = express.Router()
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../modules/controllers/user.controller')

// Validations
const createValidation = require('../modules/validations/user-create.validation')
const updateValidation = require('../modules/validations/user-update.validation')
const deleteValidation = require('../modules/validations/user-delete.validation')

router.route('/')
    .get(getUsers)
    .post(createValidation, createUser)

router.route('/:id')
    .get(getUser)
    .patch(updateValidation, updateUser)
    .delete(deleteValidation, deleteUser)

module.exports = router