import mongoose from "mongoose"

//Crea la coleccion con el nombre 
const chatCollection = "messages"

//Declara el esquema
const chatSchema = new mongoose.Schema({
    "user":String,
    "message":String
})

const chatModel = mongoose.model(chatCollection, chatSchema)

export default chatModel
