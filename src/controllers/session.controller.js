import { censoredUser } from '../dao/dtos/users.dto.js'

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

export async function login(req, res) {
    if (!req.user)
        return res.status(400).send({
            status: 'Error',
            error: 'Los datos son incorrectos o los campos estan incompletos',
        })
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            rol: req.user.rol,
            cart: req.user.cart,
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
