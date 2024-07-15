import productModel from '../models/product.model.js'

export async function getAllProducts () {
    try {
        return productModel.find()
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function getProductsPaginated (query, options) {
    try {
        return productModel.paginate(query,options)
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function getProductById (id) {
    try {
        return productModel.findById({ _id: id })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function createProduct (newProduct) {
    try {
        return await productModel.create(newProduct)
    } catch (error) {
        res.status(404).json({ 
            status: 'Error',
            ERROR: `${error.message}` 
        })
    }
}

export async function updateProduct (id, product) {
    try {
        return await productModel.updateOne({ _id: id }, product)
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function deleteProduct (id) {
    try {
        return await productModel.findByIdAndDelete({ _id: id })
    } catch (error) {
        res.status(404).json({ ERROR: `${error.message}` })
    }
}
