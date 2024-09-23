import { Router } from 'express'
import * as controller from '../../controllers/user.controller.js'
import { isNotAdmin, isAdmin } from '../../middleware/auth.js'
import { loadDocs } from '../../middleware/loadDocs.js'
import { uploader } from '../../utils.js'

const router = Router()

router.get('/', controller.getAllUsers)

router.post('/premium/:uid', controller.changeRol)

router.post(
    '/:uid/documents',
    uploader.array('docs', 3),
    loadDocs,
    controller.changeRol
)

router.post('/:uid', controller.deleteUser)

router.delete('/', controller.deleteUsers)

export default router
