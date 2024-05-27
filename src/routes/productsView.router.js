import { Router } from 'express'
import ProductManager from '../dao/mongoDB/productManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const result = await productManager.getProducts(req)
        result.payload = result.payload.map((element) => element.toObject()) // Hago del payload objetos planos
        res.render('productsView', result)
    } catch (error) {
        throw error
    }
})
export default router
