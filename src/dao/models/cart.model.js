import mongoose from 'mongoose'

//Crea la coleccion con el nombre
const cartCollection = 'carts'

//Declara el esquema
const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: Number,
            },
        ],
        default: [],
    },
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel
