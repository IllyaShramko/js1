import { Request, Response } from "express"
import { PostService } from "./post.service"
import { PostControllerContract } from "./post.types"
import { env } from "../config/env"
import { TokenExpiredError, verify } from "jsonwebtoken"
import { userService } from "../User/user.service"


export const PostController: PostControllerContract = {
    getTimeDate: (req, res) => {
        res.json({ timestamp: PostService.getTimeDate()})
    },
    getAllPosts: async (req, res) => {
        let skip: any = req.query.skip
        if (skip) {
            skip = +skip
            if (isNaN(skip)) {
                res.status(400).json()
                return
            }
        }
        let take: any = req.query.take
        if (take) {
            take = +take
            if (isNaN(take)) {
                res.status(400).json()
                return
            }
        }
        PostService.getAllPosts(skip, take).then((posts) => {
            res.status(200).json(posts)
        })
    },
    getById: (req, res) => {
        if (!req.params.id){
            res.status(400).json("id is required");
            return
        } 
        const id = +req.params.id
        console.log(id)
        if (isNaN(id)){
            res.status(400).json("id must be an integer");
            return;
        }
      
        res.json(PostService.getById(id))

    },
    createPost: async (req, res) => {
        console.log(req.body)
        const Authorization = req.headers.authorization
        if (!Authorization) {
            res.status(401).json({message: "authorization is required"})
            return
        }
        const [type, token] = Authorization.split(" ")
        console.log(type, token)
        if (type != "Bearer" || !token) {
            res.status(401).json({message: "wrong format autharization"})
            return
        }
        const body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }
        if (!body.name) {
            res.status(422).json("name is required.")
            return
        }
        if (!body.description) {
            res.status(422).json("description is required.")
            return
        }
        if (!body.imageUrl) {
            res.status(422).json("image url is required.")
            return
        }
        try {
            const userId = res.locals.userId
            const newPost = await PostService.createPost({...body, createdById: userId})
            if (!newPost) {
                res.status(404).json({message: "Post creation error"})
                return
            }
            res.status(200).json(newPost)
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    },
    async update(req, res) {
        const id = req.params.id
        if (!id){
            res.status(400).json("id is required");
            return
        }
        if (isNaN(+id)){
            res.status(400).json("id must be an integer");
            return;
        }
        const body = req.body
        await PostService.update(+id, body).then((post) => {
            if (!post) {
                res.status(500).json("Post update error")
                return
            }
            res.status(200).json(post)
        })

    },
    async delete(req, res) {
        const id = req.params.id
        if (!id){
            res.status(400).json("id is required");
            return
        }
        if (isNaN(+id)){
            res.status(400).json("id must be an integer");
            return;
        }
        await PostService.delete(+id).then((result) => {
            if (result === "not found") {
                res.status(404).json("Post not found")
                return
            }
            else if (!result) {
                res.status(500).json("Post deletion error")
                return
            }
            res.status(200).json(result)
        })
    }
}