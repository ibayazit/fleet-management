const express = require('express')
const router = express.Router()
const { findLatestUnfinishedSession, createCharingSession, doneSessions } = require('../modules/controllers/charge-session.controller')

router.route('/')
    .get(findLatestUnfinishedSession)
    .post(createCharingSession)

router.route('/done')
    .get(doneSessions)
module.exports = router