import { Request, Response } from "express"
import { PostService } from "./post.service"
import { PostControllerContract } from "./post.types"


export const PostController: PostControllerContract = {
    getTimeDate: (req, res) => {
        res.json({ timestamp: PostService.getTimeDate()})
    },
    getAllPosts: (req, res) => {
        let skip
        let take

        if (req.query.skip !== undefined) {
            skip = +req.query.skip
            if (isNaN(skip)) {
                return res.status(400).json({ error: "skip must be a number" })
            }
        } else {
            skip = 0
        }

        if (req.query.take !== undefined) {
            take = +req.query.take
            if (isNaN(take)) {
                return res.status(400).json({ error: "take must be a number" })
            }
        } else {
            take = undefined
        }

        PostService.getAllPosts(skip, take).then((posts_sorted) => {
            res.status(200).json(posts_sorted)
        })
    },
    getById: (req, res) => {
        
        if (!req.params.id){
            res.status(400).json("id is required");
            return
        }
        const id = +req.params.id
        if (isNaN(id)){
            res.status(400).json("id must be an integer");
            return;
        }
        PostService.getById(id).then((post)=>{
            if (!post){
                res.status(404).json("post not found")
                return;
            }
            res.status(200).json(post)
        })

    },
    createPost: async (req, res) => {
        console.log(req.body)
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
        const newPost = await PostService.createPost({...body})
        if (!newPost) {
            res.status(500).json("Post creation error")
        }
        res.status(201).json(newPost)
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
        const post = await PostService.update(+id, body)
        if (!post) {
            res.status(500).json("Post update error")
            return
        }
        res.status(200).json(post)

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