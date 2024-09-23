import { Router } from 'express'
import * as productManager from '../repository/products.repository.js'
import * as cartManager from '../repository/carts.repository.js'
import {
    isAuthenticated,
    isNotAuthenticated,
    isNotAdmin,
    isAdmin,
} from '../middleware/auth.js'
import { authToken } from '../middleware/recoveryValidation.js'
import * as usersManager from '../dao/mongoDB/userData.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        res.redirect('/login')
    } catch (error) {
        throw error
    }
})

router.get('/products', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }
        const response = await productManager.getProducts(req)
        response.payload = response.payload.map((element) => element.toObject())
        const result = {
            response: response,
            user: req.session.user,
            isAdmin: req.session.user.rol === 'admin',
        }
        res.render('productsView', result)
    } catch (error) {
        throw error
    }
})

router.get('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params
        let result = await cartManager.getProductsInCart(cartId)
        result = result.map((element) => element.toObject())
        res.render('cartProductsView', { result: result, cartId })
    } catch (error) {
        throw error
    }
})

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('loginView')
})

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('registerView')
})

router.get('/profile', isAuthenticated, (req, res) => {
    const user = req.session.user
    const premium = user.rol == 'premium' ? true : false
    const completeDocs = user.documents.length >= 3 ? true : false
    res.render('profileView', { user, premium, completeDocs })
})

router.get('/chatroom', isNotAdmin, (req, res) => {
    res.render('chatView', {})
})

router.get('/recovery', async (req, res) => {
    res.render('recoveryView', {})
})

router.get('/link-expired', async (req, res) => {
    res.render('expiredView', {})
})

router.get('/recovery-password/:token', authToken, async (req, res) => {
    const uid = req.user._id
    res.render('passwordRecoveryView', { uid })
})

router.get('/upload-documents', async (req, res) => {
    const uid = req.session.user._id
    res.render('uploadDocumentsView', { uid })
})

router.get('/users', isAdmin, async (req, res) => {
    let users = await usersManager.getAllUsers()
    users = users.map((element) => element.toObject())
    res.render('usersView', { users })
})

export default router
