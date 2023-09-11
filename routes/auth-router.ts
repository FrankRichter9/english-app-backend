import express from 'express'
import AuthController from '../controllers/auth-controller'
import authMiddleware from '../middlewares/auth-middlewares'
import usersController from '../controllers/users-controller'
import authMiddlewares from '../middlewares/auth-middlewares'

const authRouter = express.Router()

authRouter.post('/registration', AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.get('/logout', AuthController.logout)

authRouter.get('/activate/:link', AuthController.activate)
authRouter.get('/refresh', AuthController.refresh)
authRouter.get('/me', authMiddlewares, AuthController.me)

export default authRouter
