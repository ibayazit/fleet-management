const express = require('express')
const router = express.Router()


router.route('/')
    .get((req, res) => {
        res.status(200).json({
            message: 'Request executed successfully',
            data: {
                name: 'ibrahim',
                surname: 'Bayazit',
                email: 'ibrbayazit@gmail.com',
                github: 'https://github.com/ibayazit'
            }
        })
    })

module.exports = router