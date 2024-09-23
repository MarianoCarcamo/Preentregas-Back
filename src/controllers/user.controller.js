import * as userManager from '../dao/mongoDB/userData.js'
import { importantDataUser } from '../dao/dtos/users.dto.js'
import config from '../config/config.js'
import rol from '../config/userRols.js'

export async function changeRol(req, res) {
    const { uid } = req.params
    try {
        if (req.session.user.rol == rol.USER) {
            const user = await userManager.findUserById(uid)
            if (user.documents.length >= 3) {
                await userManager.toggleRol(uid)
                req.session.user.rol = rol.PEMIUM
                res.send({
                    status: 'success',
                    message: 'Rol actualizado con exito',
                })
            } else {
                throw error
            }
        } else {
            await userManager.toggleRol(uid)
            req.session.user.rol = rol.USER
            res.send({
                status: 'success',
                message: 'Rol actualizado con exito',
            })
        }
    } catch (error) {
        res.json({ status: 'Error', message: 'Documentacion insuficiente' })
    }
}

export async function getAllUsers(req, res) {
    try {
        let users = await userManager.getAllUsers()
        users = users.map((user) => importantDataUser(user))
        res.send({
            status: 'success',
            payload: users,
        })
    } catch (error) {
        res.json({
            status: 'Error',
            message: 'No se pudo traer a los usuarios de la base de datos',
        })
    }
}

export async function deleteUsers(req, res) {
    try {
        await userManager.deleteUsers(config.inactivity)
        res.send({
            status: 'success',
            message: `Los usuarios con mas de ${config.inactivity} dias sin actividad fueron eliminados con exito`,
        })
    } catch (error) {
        res.json({
            status: 'Error',
            message: 'No se pudo eliminar a los usuarios de la base de datos',
        })
    }
}

export async function deleteUser(req, res) {
    try {
        const { uid } = req.params
        await userManager.deleteUser(uid)
        res.send({
            status: 'success',
            message: `Usuario eliminado con exito`,
        })
    } catch (error) {
        res.json({
            status: 'Error',
            message: 'No se pudo eliminar al usuario de la base de datos',
        })
    }
}
