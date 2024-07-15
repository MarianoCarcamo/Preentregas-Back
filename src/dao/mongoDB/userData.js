import userModel from '../models/user.model.js'

export async function createUser (user) {
    return await userModel.create(user)
}

export async function findUserByEmail (email) {
    return await userModel.findOne({email})
}

export async function findUserById (id) {
    return await userModel.findById(id)
}