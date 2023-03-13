require('dotenv').config()

const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')

const routeValidationError = require('./utils/validation-error')
const routeNotFound = require('./utils/not-found')
const { authenticateToken } = require('./utils/jwt')

const routeCompany = require('./routes/company.router')
const routeOrganization = require('./routes/organization.router')
const routeUser = require('./routes/user.router')
const routeChargeSession = require('./routes/charge-session.router')
const routeAuth = require('./routes/auth.router')
const routeWelcome = require('./routes/welcome.router')

const app = express();
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', routeWelcome)
app.use('/api/v1/companies', routeCompany)
app.use('/api/v1/organizations', routeOrganization)
app.use('/api/v1/users', routeUser)
app.use('/api/v1/auth', routeAuth)
app.use('/api/v1/charge-session', authenticateToken, routeChargeSession)
app.use(routeNotFound)
app.use(routeValidationError)

const start = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_URI)
            .then(() => console.log('Connected to the database'))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()

module.exports = app;
