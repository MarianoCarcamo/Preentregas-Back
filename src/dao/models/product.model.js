import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

//Crea la coleccion con el nombre
const productCollection = 'products'

//Declara el esquema
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: Array, default: [] },
    owner: { type: String, default: '0', required: true },
})

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema)

export default productModel
