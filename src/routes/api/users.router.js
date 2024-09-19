import { Router } from 'express'
import * as controller from '../../controllers/user.controller.js'
import { isNotAdmin } from '../../middleware/auth.js'
import { loadDocs } from '../../middleware/loadDocs.js'
import { uploader } from '../../utils.js'

const router = Router()

router.put('/premium/:uid', isNotAdmin, controller.changeRol)

router.post(
    '/:uid/documents',
    uploader.array('docs', 3),
    loadDocs,
    controller.changeRol
)

export default router
