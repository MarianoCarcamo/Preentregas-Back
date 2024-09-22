import { censoredUser } from '../dao/dtos/users.dto.js'
import { sendRecoveryLink } from '../services/email.service.js'
import { updatePassword, findUserById } from '../dao/mongoDB/userData.js'
import { createHash, isValidPassword } from '../utils.js'

export async function currentUser(req, res) {
    const user = censoredUser(req.session.user)
    res.json(user)
}

export async function register(req, res) {
    res.redirect('/login')
}

export async function failedRegister(req, res) {
    res.send({ status: 'Error', error: 'Fallo al registrar un nuevo usuario' })
}

export async function failedPasswordRecovery(req, res) {
    res.send({ status: 'Error', error: 'Fallo al restablecer contraseña' })
}

export async function login(req, res) {
    if (!req.user)
        return res.status(400).send({
            status: 'Error',
            error: 'Los datos son incorrectos o los campos estan incompletos',
        })
    try {
        req.session.user = {
            _id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            rol: req.user.rol,
            cart: req.user.cart,
            documents: req.user.documents,
        }
        res.redirect('/products')
    } catch (error) {
        res.status(500).send('Error al iniciar sesión')
    }
}

export async function failedLogin(req, res) {
    res.send({ status: 'Error', error: 'Login Failed' })
}

export async function logout(req, res) {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión')
        res.redirect('/login')
    })
}

export async function github(req, res) {}

export async function githubcallback(req, res) {
    req.session.user = req.user
    res.redirect('/products')
}

export async function recoveryEmail(req, res) {
    const user = req.user
    const recovery_link = req.recoveryLink
    try {
        sendRecoveryLink(user, recovery_link)
        res.redirect('/login')
    } catch (error) {
        res.send({
            status: 'ERROR',
            message:
                'Error al enviar el mail de reestablecimiento de contraseña',
        })
    }
}

export async function recoveryPassword(req, res) {
    const { uid } = req.params
    const { password } = req.body
    try {
        if (!isValidPassword(await findUserById(uid), password)) {
            await updatePassword(uid, createHash(password))
            res.redirect('/login')
        } else {
            res.send({
                status: 'ERROR',
                message: 'No puede utilizar la misma contraseña',
            })
        }
    } catch (error) {
        res.send({
            status: 'ERROR',
            message: 'Error al restablecer la contraseña',
        })
    }
}
