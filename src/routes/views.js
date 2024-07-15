import { Router } from 'express'
import * as productManager from '../repository/products.repository.js'
import * as cartManager from '../repository/carts.repository.js'
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js'

const router = Router()

router.get('/products', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login')
        }
        const response = await productManager.getProducts(req)
        response.payload = response.payload.map((element) => element.toObject()) // Hago del payload objetos planos
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
    res.render('profileView', { user: req.session.user })
})

router.get('/chatroom', (req, res) => {
    res.render('chatView', {})
})

export default router
