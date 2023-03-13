const userModel = require('../../database/models/user.model')

const findById = async (id) => {
    const user = await userModel.findById(id)

    return user
}

const findByEmail = async (email) => {
    const user = await userModel.findOne({email})

    return user
}

const get = async () => {
    const users = await userModel.find({})

    return users
}

const create = async (data) => {
    const user = await userModel.create(data)

    return user
}

const updateById = async (id, data) => {
    const user = await userModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })

    return user
}

const deleteById = async (id) => {
    const user = await userModel.findByIdAndDelete(id)

    return user
}

module.exports = {
    findById,
    findByEmail,
    get,
    create,
    updateById,
    deleteById
}