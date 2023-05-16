import express from 'express'
import { userLogOutController, userLoginController, userRegisterController } from '../controllers/authController.js'

const router = express.Router()

router.post('/register',userRegisterController)
router.post('/login',userLoginController)
router.post('/logout',userLogOutController)





export default router
