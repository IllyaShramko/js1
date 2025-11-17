import express from 'express'
import { PostController } from './post.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const PostRouter: express.Router = express.Router()

PostRouter.get("/timestamp", PostController.getTimeDate);

PostRouter.get("/posts", PostController.getAllPosts);

PostRouter.get("/posts/:id", PostController.getById);

PostRouter.post("/posts", authMiddleware, PostController.createPost);

PostRouter.put("/posts/:id", authMiddleware, PostController.update)

PostRouter.delete("/posts/:id", authMiddleware, PostController.delete)
export { PostRouter }