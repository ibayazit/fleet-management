const mongoose = require('mongoose')

const schema = mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Company id is required'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [60, 'Name must be less than or equal to 60 characters']
    },
    battery: {
        type: Number,
        required: [true, 'Battery is required'],
        trim: true
    },
    charging_fee: {
        type: Number,
        required: [true, 'Charging fee is required'],
        trim: true,
        min: [0, 'Charging fee must be bigger than or equal to 0']
    }
}, {timestamps: true})

module.exports = mongoose.model('organizations', schema)