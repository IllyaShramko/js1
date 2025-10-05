const express = require("express")
const PostController = require("./post.controller")

const PostRouter = express.Router()

PostRouter.get("/", PostController.hello);

PostRouter.get("/timestamp", PostController.getTimeDate);

PostRouter.get("/posts", PostController.getAllPosts)

PostRouter.get("/posts/:id", PostController.getPostById)

PostRouter.post("/posts", PostController.createPost)

module.exports = PostRouter