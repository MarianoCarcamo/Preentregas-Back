import userModel from '../models/user.model.js'
import rol from '../../config/userRols.js'
import { sendDeleteConfirmation } from '../../services/email.service.js'

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

export async function updateLastConnection(user) {
    return await userModel.findOneAndUpdate(
        { email: user.email },
        { last_connection: new Date() }
    )
}

export async function updateDocs(id, docs) {
    const user = await findUserById(id)
    user.documents.push(...docs)
    return await userModel.findByIdAndUpdate(
        id,
        { documents: user.documents },
        { new: true }
    )
}

export async function getAllUsers() {
    try {
        return userModel.find()
    } catch (error) {
        throw error
    }
}

export async function deleteUsers(inactivityDays) {
    const today = new Date()
    const limit = new Date(today.setDate(today.getDate() - inactivityDays))

    try {
        const users = await userModel.find({ last_connection: { $lt: limit } })
        const result = await userModel.deleteMany({
            last_connection: { $lt: limit },
        })
        users.forEach(async (user) => {
            await sendDeleteConfirmation(user)
        })
    } catch (error) {
        throw error
    }
}

export async function deleteUser(uid) {
    try {
        const result = await userModel.findByIdAndDelete(uid)
        return result
    } catch (error) {
        throw error
    }
}
