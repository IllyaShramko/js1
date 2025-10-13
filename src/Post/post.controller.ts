import { Request, Response } from "express"
import { PostService } from "./post.service"

export const PostController = {
    hello: (req: Request, res: Response) => {
        res.json("hello");
    },
    getTimeDate: (req: Request, res: Response) => {
        res.json({ timestamp: PostService.getTimeDate()})
    },
    getAllPosts: (req: Request, res: Response) => {
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
            take = null
        }

        let posts_sorted = PostService.getAllPosts(skip, take)

        res.status(200).json(posts_sorted)
    },
    getPostById: (req: Request, res: Response) => {
        
        if (!req.params.id){
            res.status(400).json("id is required");
            return
        }
        const id = +req.params.id
        if (isNaN(id)){
            res.status(400).json("id must be an integer");
            return;
        }
        const post = PostService.getById(id)
        if (!post){
            res.status(404).json("post not found")
            return;
        }

        res.status(200).json(post)
    },
    createPost: async (req: Request, res: Response) => {
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
        if (!body.image) {
            res.status(422).json("image url is required.")
            return
        }
        const newPost = await PostService.createPost({...body})
        if (!newPost) {
            res.status(500).json("Post creation error")
        }
        res.status(201).json(newPost)
    },
    async update(req: Request, res: Response) {
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
        if (body.id){
            res.status(422).json("body must not consist id");
            return
        }
        const post = await PostService.update(+id, body)
        if (!post) {
            res.status(500).json("Post update error")
            return
        }
        res.status(200).json(post)

    },
    
}