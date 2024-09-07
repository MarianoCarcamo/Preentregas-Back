import rol from '../config/userRols.js'

export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next()
    } else {
        res.redirect('/login')
    }
}

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next()
    } else {
        res.redirect('/profile')
    }
}

export const isAdmin = (req, res, next) => {
    if (req.session.user.rol === rol.ADMIN) {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}

export const isNotAdmin = (req, res, next) => {
    if (req.session.user.rol !== rol.ADMIN) {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}

export const isUser = (req, res, next) => {
    if (req.session.user.rol === rol.USER) {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}

export const isNotUser = (req, res, next) => {
    if (req.session.user.rol !== rol.USER) {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}

export const isPremium = (req, res, next) => {
    if (req.session.user.rol === rol.PREMIUM) {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}

export const isNotPremium = (req, res, next) => {
    if (req.session.user.rol !== rol.PREMIUM) {
        return next()
    } else {
        res.send({ error: 'Acceso denegado' })
    }
}
