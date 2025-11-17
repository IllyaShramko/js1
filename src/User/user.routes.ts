import express from 'express'
import { UserController } from './user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const UserRouter: express.Router = express.Router()

UserRouter.post("/login", UserController.login)

UserRouter.post("/register", UserController.register)

UserRouter.get('/me', authMiddleware, UserController.me)

export { UserRouter }