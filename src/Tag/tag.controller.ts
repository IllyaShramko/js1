import { TagService } from "./tag.service"
import { TagControllerContract } from "./tag.types"

export const TagController: TagControllerContract = { 
    getAllTags: async (req, res) => {
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
        TagService.getAllTags(skip, take).then((tags) => {
            res.status(200).json(tags)
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
      
        res.json(TagService.getById(id))

    },
    createTag: async (req, res) => {
        const body = req.body
        console.log(body)
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }
        if (!body.name) {
            res.status(422).json("name is required.")
            return
        }
        try {
            const newTag = await TagService.createTag(body.name)
            if (!newTag) {
                res.status(500).json("Tag creation failed.")
                return
            }
            res.status(201).json(newTag)
        } catch (error) {
            res.status(500).json("Internal server error.")
        }
    }
}