import { updateDocs } from '../dao/mongoDB/userData.js'

//Middleware para cargar archivos a la base de datos
export async function loadDocs(req, res, next) {
    if (!req.files) {
        return res
            .status(400)
            .send({ status: 'Error', error: 'No se pudo guardar la imagen' })
    }
    const docs = req.files.map((file) => {
        return {
            name: file.originalname,
            reference: file.path,
        }
    })
    req.session.user.documents = (
        await updateDocs(req.session.user._id, docs)
    ).documents
    next()
}
