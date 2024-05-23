import express from 'express'
import mongoose from 'mongoose'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
    .connect(
        'mongodb+srv://Mariano:123321@cluster0.jjfvoiv.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error en la conexion', error))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Server's up and running on port ${PORT}`)
})
