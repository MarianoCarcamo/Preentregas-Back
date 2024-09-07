import express from 'express'
import * as controller from '../../controllers/products.controller.js'
import { isNotUser } from '../../middleware/auth.js'
import { isOwner } from '../../middleware/verifyProductOwner.js'

const router = express.Router()

// ENDPOINTS
router.get('/', controller.getAllProducts)
router.get('/:idProduct', controller.getProductById)
router.post('/', isNotUser, controller.createProduct)
router.put('/:productId', isNotUser, isOwner, controller.updateProduct)
router.delete('/:productId', isNotUser, isOwner, controller.deleteProduct)

export default router
