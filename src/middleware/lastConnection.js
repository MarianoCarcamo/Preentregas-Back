import { updateLastConnection } from '../dao/mongoDB/userData.js'

export async function lastConnection(req, res, next) {
    const { user } = req
    try {
        await updateLastConnection(user)
        next()
    } catch (error) {
        res.send({
            status: 'Error',
            error: 'Error al actualizar la ultima conexión',
        })
    }
}
