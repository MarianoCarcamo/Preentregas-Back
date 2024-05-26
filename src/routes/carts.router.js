import express from 'express'
import CartManager from '../dao/mongoDB/cartManager.js'

const router = express.Router()

const cartManager = new CartManager()

// ENDPOINTS
router.get('/:cartId', (req, res) => {
    const id = req.params.cartId
    cartManager
        .getProductsInCart(id)
        .then((products) => {
            res.send(products)
        })
        .catch((error) => {
            res.status(404).json({
                ERROR: `${error.message}`,
            })
        })
})

router.post('/:cartId/product/:productId', (req, res) => {
    const cartId = req.params.cartId
    const prodId = req.params.productId
    cartManager
        .addProductInCart(cartId, prodId)
        .then(() =>
            res.json({ Message: 'Producto agregado con exito al carrito' })
        )
        .catch((error) => {
            res.status(400).json({ ERROR: `${error.message}` })
        })
})

router.post('/', (req, res) => {
    cartManager
        .addCart()
        .then(() => {
            res.json({ message: 'Carrito creado con exito' })
        })
        .catch((error) => {
            res.status(400).json({ ERROR: `${error.message}` })
        })
})

router.delete('/:cartId/product/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params
        await cartManager.deleteProductInCart(cartId, productId)
        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
})

router.put('/:cartId/product/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params
        const { quantity } = req.body
        await cartManager.updateProductQuantity(cartId, productId, quantity)
        res.json({
            status: 'success',
            message: 'Operacion realizada con exito!',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
})

router.delete('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params
        await cartManager.deleteAllProductsInCart(cartId)
        res.json({
            status: 'success',
            message: 'Operacion realizada con exito!',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
})

router.put('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params
        const { payload } = req.body
        await cartManager.addProductsInCart(cartId, payload)
        res.json({
            status: 'success',
            message: 'Operacion realizada con exito!',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
})

export default router
