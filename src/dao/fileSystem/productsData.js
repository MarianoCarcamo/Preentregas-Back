import fs from 'fs/promises'

const productsFile = './src/db/products.json'
const productNotFound = new Error('Producto no encontrado')

//Funciones Internas
function updateByField(product, updatedProduct) {
    for (const key of Object.keys(updatedProduct)) {
        product[key] = updatedProduct[key]
    }
    return product
}

async function nextId() {
    const ids = (await getAllProducts()).map((prod) => {
        return prod._id
    })
    return isFinite(Math.max(...ids)) ? Math.max(...ids) + 1 : 1
}

//Funciones Externas
export async function getAllProducts() {
    try {
        const data = await fs.readFile(productsFile, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []
        } else {
            throw error
        }
    }
}

// export async function getProductsPaginated(query, options) {
//     try {
//         return productModel.paginate(query, options)
//     } catch (error) {
//         res.status(404).json({
//             status: 'Error',
//             ERROR: `${error.message}`,
//         })
//     }
// }

export async function getProductById(id) {
    try {
        const product = (await getAllProducts()).find((prod) => prod._id === id)
        if (product) {
            return product
        } else {
            throw productNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function createProduct(newProduct) {
    try {
        let products = await getAllProducts()
        newProduct._id = (await nextId()) ?? 1
        newProduct.status = true
        products.push(newProduct)
        await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
        return newProduct
    } catch (error) {
        throw error
    }
}

export async function updateProduct(id, product) {
    try {
        const products = await getAllProducts()
        const product_index = products.findIndex((prod) => prod._id === id)
        if (product_index > -1) {
            products[product_index] = updateByField(
                products[product_index],
                product
            )
            await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
        } else {
            throw productNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function deleteProduct(id) {
    try {
        let products = await getAllProducts()
        products = products.filter((prod) => prod._id !== id)
        await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
    } catch (error) {
        throw error
    }
}
