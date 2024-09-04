import productModel from '../models/product.model.js'

export async function getAllProducts() {
    try {
        return productModel.find()
    } catch (error) {
        throw error
    }
}

export async function getProductsPaginated(query, options) {
    try {
        return productModel.paginate(query, options)
    } catch (error) {
        throw error
    }
}

export async function getProductById(id) {
    try {
        return productModel.findById({ _id: id })
    } catch (error) {
        throw error
    }
}

export async function createProduct(newProduct) {
    try {
        return await productModel.create(newProduct)
    } catch (error) {
        throw error
    }
}

export async function updateProduct(id, product) {
    try {
        return await productModel.updateOne({ _id: id }, product)
    } catch (error) {
        throw error
    }
}

export async function deleteProduct(id) {
    try {
        return await productModel.findByIdAndDelete({ _id: id })
    } catch (error) {
        throw error
    }
}
