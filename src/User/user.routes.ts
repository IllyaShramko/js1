import express from 'express'
import { UserController } from './user.controller'

const UserRouter: express.Router = express.Router()

UserRouter.post("/login", UserController.login)

UserRouter.post("/register", UserController.register)

UserRouter.get("/me", UserController.me)

export { UserRouter }