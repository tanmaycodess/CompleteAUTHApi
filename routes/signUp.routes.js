import express from 'express'
import { signUpController } from '../controllers/signUp.controller.js'

const router = express.Router()

router.post('/sign-up' , signUpController)

export default router