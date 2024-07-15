import express from 'express'
import * as controller from '../../controllers/products.controller.js'
import { isAdmin } from '../../middleware/auth.js'

const router = express.Router()

// ENDPOINTS
router.get('/', controller.getAllProducts)
router.get('/:idProduct', controller.getProductById)
router.post('/', isAdmin, controller.createProduct)
router.put('/:productId', isAdmin, controller.updateProduct)
router.delete('/:productId', isAdmin, controller.deleteProduct)

export default router
