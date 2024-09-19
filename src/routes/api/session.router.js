import { Router } from 'express'
import { isAuthenticated } from '../../middleware/auth.js'
import passport from 'passport'
import * as controller from '../../controllers/session.controller.js'
import * as recoveryMiddleware from '../../middleware/recoveryValidation.js'
import { lastConnection } from '../../middleware/lastConnection.js'

const router = Router()

router.get('/current', isAuthenticated, controller.currentUser)

router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: 'failregister' }),
    controller.register
)

router.get('/failregister', controller.failedRegister)

router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: 'faillogin' }),
    lastConnection,
    controller.login
)

router.get('/faillogin', controller.failedLogin)

router.post('/logout', lastConnection, controller.logout)

router.get(
    '/github',
    passport.authenticate('github', { scope: 'user.email' }),
    controller.github
)

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    lastConnection,
    controller.githubcallback
)

router.post(
    '/recovery',
    recoveryMiddleware.recoveryValidation,
    recoveryMiddleware.generateLink,
    controller.recoveryEmail
)

router.get('/failrecovery', controller.failedPasswordRecovery)

router.post('/recovery-password/:uid', controller.recoveryPassword)

export default router
