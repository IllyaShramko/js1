import express from 'express'
import { PostController } from './post.controller'

const PostRouter: express.Router = express.Router()

PostRouter.get("/", PostController.hello);

PostRouter.get("/timestamp", PostController.getTimeDate);

PostRouter.get("/posts", PostController.getAllPosts);

PostRouter.get("/posts/:id", PostController.getPostById);

PostRouter.post("/posts", PostController.createPost);

export { PostRouter }