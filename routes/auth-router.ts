import express from 'express'
import AuthController from '../controllers/auth-controller'
import authMiddleware from '../middlewares/auth-middlewares'
import usersController from '../controllers/users-controller'

const authRouter = express.Router()

authRouter.post('/registration', AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/activate/:link', AuthController.activate)
authRouter.get('/refresh', AuthController.refresh)

export default authRouter
