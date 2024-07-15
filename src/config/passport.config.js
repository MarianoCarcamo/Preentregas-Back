import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import config from './config.js'
import * as userService from '../dao/mongoDB/userData.js'
import { createHash, isValidPassword } from '../utils.js'

const ADMIN = {
    _id: 0,
    first_name: 'Coder',
    last_name: 'House',
    age: 20,
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123',
    rol: 'admin',
}

const localStrategy = local.Strategy

const initializePassport = () => {
    //Estrategias por terceros
    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: config.clientId,
                clientSecret: config.clientSecret,
                callbackURL:
                    'http://localhost:8080/api/sessions/githubcallback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await userService.findUserByEmail(profile._json.email)
                    if (!user) {
                        let newUser = {
                            first_name: profile._json.name,
                            email: profile._json.email,
                        }
                        await fetch('http://localhost:8080/api/carts', {
                            method: 'POST',
                        })
                            .then((res) => res.json())
                            .then((data) => (newUser.cart = data.result._id))
                        let result = await userService.createUser(newUser)
                        done(null, result)
                    } else {
                        done(null, user)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    //Estrategias locales
    passport.use(
        'register',
        new localStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body
                try {
                    let user = await userService.findUserByEmail(username)
                    if (user) {
                        console.log('El usuario ya existe')
                        return done(null, false)
                    }
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                    }
                    await fetch('http://localhost:8080/api/carts', {
                        method: 'POST',
                    })
                        .then((res) => res.json())
                        .then((data) => (newUser.cart = data.result._id))
                    let result = await userService.createUser(newUser)
                    return done(null, result)
                } catch (error) {
                    return done('Error al obtener el usuario' + error)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        if (id === ADMIN._id) {
            done(null, ADMIN)
        } else {
            done(null, await userService.findUserById(id))
        }
    })

    passport.use(
        'login',
        new localStrategy(
            { usernameField: 'email' },
            async (username, password, done) => {
                try {
                    if (username === ADMIN.email && password === ADMIN.password)
                        return done(null, ADMIN)
                    const user = await userService.findUserByEmail(username)
                    if (!user) {
                        return done(null, false)
                    }
                    if (!isValidPassword(user, password))
                        return done(null, false)
                    return done(null, user)
                } catch (error) {
                    done(error)
                }
            }
        )
    )
}

export default initializePassport
