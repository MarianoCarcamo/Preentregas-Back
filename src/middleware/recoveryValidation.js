import { findUserByEmail } from '../dao/mongoDB/userData.js'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export async function recoveryValidation(req, res, next) {
    try {
        const { email } = req.body
        const user = await findUserByEmail(email)
        req.user = user
        if (!user) {
            res.json({
                status: 'Error',
                message: 'Direccion de correo electrónico no registrada',
            })
        } else if (!user.password) {
            res.json({
                status: 'Error',
                message:
                    'No requiere contraseña para ingresar. Su registro esta hecho con GitHub',
            })
        } else {
            next()
        }
    } catch (error) {
        throw error
    }
}

export function generateLink(req, res, next) {
    const user = req.user
    const token = jwt.sign({ user }, config.JWTsecret, { expiresIn: '1h' })
    const link = `http://localhost:${config.port}/recovery-password/${token}`
    req.recoveryLink = link
    next()
}

export function authToken(req, res, next) {
    const { token } = req.params
    jwt.verify(token, config.JWTsecret, (error, credentials) => {
        if (error) {
            return res.redirect('/link-expired')
        } else {
            req.user = credentials.user
            next()
        }
    })
}
