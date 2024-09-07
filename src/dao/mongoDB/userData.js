import userModel from '../models/user.model.js'
import rol from '../../config/userRols.js'

export async function createUser(user) {
    return await userModel.create(user)
}

export async function findUserByEmail(email) {
    return await userModel.findOne({ email })
}

export async function findUserById(id) {
    return await userModel.findById(id)
}

export async function updatePassword(_id, password) {
    return await userModel.findByIdAndUpdate({ _id }, { password })
}

export async function toggleRol(id) {
    const user = await findUserById(id)
    if (user.rol === rol.PEMIUM) {
        user.rol = rol.USER
    } else {
        user.rol = rol.PEMIUM
    }
    return await userModel.findByIdAndUpdate(id, { rol: user.rol })
}
