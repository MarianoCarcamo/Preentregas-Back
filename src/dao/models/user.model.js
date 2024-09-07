import mongoose from 'mongoose'
import rol from '../../config/userRols.js'

const userCollection = 'Users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    rol: { type: String, default: rol.USER },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
})

const firstCollection = mongoose.model(userCollection, userSchema)

export default firstCollection
