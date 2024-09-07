import { Router } from 'express'
import * as controller from '../../controllers/user.controller.js'
import { isNotAdmin } from '../../middleware/auth.js'

const router = Router()

router.put('/premium/:uid', isNotAdmin, controller.changeRol)

export default router
