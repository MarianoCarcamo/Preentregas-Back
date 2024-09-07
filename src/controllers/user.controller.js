import { toggleRol } from '../dao/mongoDB/userData.js'

export async function changeRol(req, res) {
    const { uid } = req.params
    await toggleRol(uid)
    res.send({
        status: 'success',
        message: 'Rol cambiado con exito',
    })
}
