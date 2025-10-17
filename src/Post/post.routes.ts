import express from 'express'
import { PostController } from './post.controller'

const PostRouter: express.Router = express.Router()

PostRouter.get("/timestamp", PostController.getTimeDate);

PostRouter.get("/posts", PostController.getAllPosts);

PostRouter.get("/posts/:id", PostController.getById);

PostRouter.post("/posts", PostController.createPost);

PostRouter.put("/posts/:id", PostController.update)

export { PostRouter }