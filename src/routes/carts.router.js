import express from 'express'
import CartManager from '../CartManager.js'

const router = express.Router()

const cartManager = new CartManager()

// ENDPOINTS
router.get('/:cartId', (req, res) => {
    const id = parseInt(req.params.cartId)
    cartManager
        .getProductsInCart(id)
        .then((p) => {
            res.send(p)
        })
        .catch((e) => {
            res.status(404).json({
                ERROR: `${e.message}`,
            })
        })
})

router.post('/:cartId/product/:productId', (req, res) => {
    const cartId = parseInt(req.params.cartId)
    const prodId = parseInt(req.params.productId)
    cartManager
        .addProductInCart(cartId, prodId)
        .then(() =>
            res.json({ Message: 'Producto agregado con exito al carrito' })
        )
        .catch((e) => {
            res.status(400).json({ ERROR: `${e.message}` })
        })
})

router.post('/', (req, res) => {
    cartManager
        .addCart()
        .then(() => {
            res.json({ message: 'Carrito creado con exito' })
        })
        .catch((e) => {
            res.status(400).json({ ERROR: `${e.message}` })
        })
})

export default router
