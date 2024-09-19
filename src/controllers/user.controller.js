import { findUserById, toggleRol } from '../dao/mongoDB/userData.js'

export async function changeRol(req, res) {
    const { uid } = req.params
    try {
        if (req.session.user.rol == 'user') {
            const user = await findUserById(uid)
            if (user.documents.length >= 3) {
                await toggleRol(uid)
            } else {
                throw error
            }
        } else {
            await toggleRol(uid)
        }
        res.send({
            status: 'success',
            message: 'Rol actualizado con exito',
        })
    } catch (error) {
        res.json({ status: 'Error', message: 'Documentacion insuficiente' })
    }
}
