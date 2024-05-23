import express from 'express'
import ProductManager from '../dao/mongoDB/productManager.js'

const router = express.Router()

const productManager = new ProductManager()

// ENDPOINTS
router.get('/', async (req, res) => {
    try {
        const response = await productManager.getProducts(req)
        res.send(response)
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
})

router.get('/:idProduct', (req, res) => {
    const pid = req.params.idProduct
    productManager
        .getProductById(pid)
        .then((product) => res.send(product))
        .catch((error) => {
            res.status(404).json({
                status: 'Error',
                ERROR: `${error.message}`,
            })
        })
})

router.post('/', (req, res) => {
    const newProduct = req.body
    productManager
        .addProduct(newProduct)
        .then((result) => {
            res.send({ result: 'succes', payload: result })
        })
        .catch((error) => {
            res.status(400).json({ ERROR: `${error.message}` })
        })
})

router.put('/:productId', (req, res) => {
    const id = req.params.productId
    const updatedProduct = req.body
    productManager
        .upDateProduct(id, updatedProduct)
        .then(() => {
            res.json({ message: 'Producto actualizado con exito' })
        })
        .catch((error) => res.status(400).json({ ERROR: `${error.message}` }))
})

router.delete('/:productId', (req, res) => {
    const id = req.params.productId
    productManager
        .deleteProduct(id)
        .then(() => {
            res.json({ message: 'Producto eliminado con exito' })
        })
        .catch((error) => {
            res.status(404).json({ ERROR: `${error.message}` })
        })
})

export default router
