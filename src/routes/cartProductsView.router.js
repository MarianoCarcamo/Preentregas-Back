import { Router } from 'express'
import CartManager from '../dao/mongoDB/cartManager.js'

const router = Router()
const cartManager = new CartManager()

router.get('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params
        let result = await cartManager.getProductsInCart(cartId)
        console.log(result)
        result = result.map((element) => element.toObject())
        res.render('cartProductsView', { result: result })
    } catch (error) {
        throw error
    }
})
export default router
