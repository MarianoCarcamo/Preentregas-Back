import dotenv from 'dotenv'

dotenv.config()

export default {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT,
    secret: process.env.SECRET,
    JWTsecret: process.env.JWT_SECRET,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    email: process.env.EMAIL,
    emailPassword: process.env.EMAIL_PASSWORD,
    inactivity: process.env.INACTIVITY_TIME,
}
