const mongoose = require('mongoose')
const organizationModel = require('../../database/models/organization.model')
const userModel = require('../../database/models/user.model')

const statusSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Status is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const schema = mongoose.Schema({
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Organization id is required'],
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        trim: true
    },
    initial_battery_level: {
        type: Number,
        required: [true, 'Initial battery level is required'],
        trim: true,
        max: [100, 'Initial battery level must be less than or equal to 100'],
        min: [0, 'Initial battery level must be greater than or equal to 0']
    },
    last_battery_level: {
        type: Number,
        required: [true, 'Last battery level is required'],
        trim: true,
        max: [100, 'Last battery level must be less than or equal to 100'],
        min: [0, 'Last battery level must be greater than or equal to 0']
    },
    amount: {
        type: Number,
        required: [true, 'Surname is required'],
        trim: true,
        min: [0, 'Amount must be bigger than or equal to 0']
    },
    status: {
        type: String,
        required: [true, 'status is required'],
        trim: true,
    },
    statuses: [statusSchema]
}, { timestamps: true })

schema.pre(['save'], async function (next) {
    const session = this

    // Update organization
    const organization = await organizationModel.findById(session.organization_id)
    organization.battery -= session.last_battery_level - session.initial_battery_level
    organization.save()

    // Calc session cost
    session.amount = (session.last_battery_level - session.initial_battery_level) * organization.charging_fee

    // Update user
    if (['done', 'fail'].includes(session.status)){
        const user = await userModel.findById(session.user_id)
        user.credit -= session.amount
        user.save()
    }

    next();
})

module.exports = mongoose.model('charge_sessions', schema)