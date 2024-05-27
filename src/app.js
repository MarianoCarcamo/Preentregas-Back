import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import productsViewRouter from './routes/productsView.router.js'
import cartProductsView from './routes/cartProductsView.router.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public/'))

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error en la conexion', error))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/products', productsViewRouter)
app.use('/carts', cartProductsView)

app.listen(PORT, () => {
    console.log(`Server's up and running on port ${PORT}`)
})
