import fs from 'fs/promises'

const productNotFound = new Error('Producto no encontrado')

class ProductManager {
    constructor() {
        this.productosFile = './src/productos.json'
    }

    async addProduct(product) {
        try {
            if (!this.isProductValid(product)) {
                throw new Error('Producto invalido')
            } else if (await this.isCodeDuplicate(product.code)) {
                throw new Error(
                    `El código del producto "${product.title}" ya está en uso`
                )
            } else {
                let products = await this.readProducts()
                product.id = (await this.nextId()) ?? 1
                product.status = true
                products.push(product)
                await fs.writeFile(
                    this.productosFile,
                    JSON.stringify(products, null, 2)
                )
            }
        } catch (error) {
            throw error
        }
    }

    async getProducts() {
        try {
            return await this.readProducts()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getProductById(id) {
        try {
            const product = (await this.readProducts()).find((p) => p.id === id)
            if (product) {
                return product
            } else {
                throw productNotFound
            }
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.readProducts()
            if (products.find((p) => p.id === id) === undefined)
                throw productNotFound
            products = products.filter((p) => p.id !== id)
            await fs.writeFile(
                this.productosFile,
                JSON.stringify(products, null, 2)
            )
        } catch (error) {
            throw error
        }
    }

    async upDateProduct(id, producto) {
        try {
            if (producto.id !== undefined)
                throw new Error('No se permite actualizar el id')
            const product_index = (await this.readProducts()).findIndex(
                (p) => p.id === id
            )
            let products = await this.readProducts()
            if (product_index > -1) {
                products[product_index] = this.updateByField(
                    products[product_index],
                    producto
                )
                await fs.writeFile(
                    this.productosFile,
                    JSON.stringify(products, null, 2)
                )
            } else {
                throw productNotFound
            }
        } catch (error) {
            throw error
        }
    }

    async readProducts() {
        try {
            const data = await fs.readFile(this.productosFile, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.code &&
            product.price &&
            product.category &&
            product.stock !== undefined
        )
    }

    async isCodeDuplicate(code) {
        const products = await this.readProducts()
        return products.some((p) => p.code === code)
    }

    async nextId() {
        const ids = (await this.readProducts()).map((p) => {
            return p.id
        })
        return isFinite(Math.max(...ids)) ? Math.max(...ids) + 1 : 1
    }

    updateByField(product, updatedProduct) {
        for (const key of Object.keys(updatedProduct)) {
            product[key] = updatedProduct[key]
        }
        return product
    }
}

export default ProductManager
