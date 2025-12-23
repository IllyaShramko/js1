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
    getById: async (req, res) => {
        const include = req.query.include
        const includeArray = Array.isArray(include) ? include : (include ? [include] : [])
        console.log(includeArray)
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
        const post = await PostService.getById(id, includeArray)
            
        if (!post) {
            res.status(404).json("Post not found")
            return
        }
        res.json(post)

    },
    createPost: async (req, res) => {
        const body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }
        if (!body.postData.name) {
            res.status(422).json("name is required.")
            return
        }
        if (!body.postData.description) {
            res.status(422).json("description is required.")
            return
        }
        try {
            const userId = res.locals.userId
            const newPost = await PostService.createPost({...body.postData, createdById: userId}, body.tagsIds)
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
        await PostService.update(+id, body.postData).then((post) => {
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
    },
    async commentPost(req, res) {
        const postId = +req.params.postId
        const userId = +req.body.userId
        const content = req.body.body
        try {
            const newComment =  await PostService.commentPost(postId, userId, content)
            if (!newComment) {
                res.status(500).json("Comment creation failed.")
                return
            }
            res.status(201).json(newComment)
        } catch (error) {
            res.status(500).json("Internal server error.")
        }
    },
    async likePost(req, res) {
        const postId = +req.params.postId
        const userId = +req.params.userId
        try {

            await PostService.likePost(postId, userId)
            res.status(200).json("Success")
        } catch (error) {
            res.status(500).json("Internal server error.")
        }
    },
    async unlikePost(req, res) {
        const postId = +req.params.postId
        const userId = +req.params.userId
        try {
            await PostService.unlikePost(postId, userId)
            res.status(200).json("Success")
        } catch (error) {
            res.status(500).json("Internal server error.")
        }
    }
}