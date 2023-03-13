const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [60, 'Name must be less than or equal to 60 characters']
    }
}, {timestamps: true})

module.exports = mongoose.model('companies', schema)