const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../utils/jwt')
const { authUser, authAttempt } = require('../modules/controllers/auth.controller')

// Validations
const authValidation = require('../modules/validations/auth.validation')

router.route('/')
    .get(authenticateToken, authUser)
    .post(authValidation, authAttempt)

module.exports = router