import express from 'express'
import * as controller from '../../controllers/carts.controller.js'
import { isNotAdmin } from '../../middleware/auth.js'

const router = express.Router()

// ENDPOINTS
router.get('/:cartId', controller.getProductsInCart)
router.post(
    '/:cartId/product/:productId',
    isNotAdmin,
    controller.addProductInCart
)
router.post('/', controller.createCart)
router.delete('/:cartId/product/:productId', controller.deleteProductInCart)
router.put('/:cartId/product/:productId', controller.updateProductQuantity)
router.delete('/:cartId', controller.deleteAllProductsInCart)
router.put('/:cartId', controller.addProductsInCart)
router.post('/:cartId/purchase', controller.purchaser)

export default router
