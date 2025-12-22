import express from 'express'
import { TagController } from './tag.controller'

const TagsRouter: express.Router = express.Router()

TagsRouter.get("/tags", TagController.getAllTags);

TagsRouter.post("/tags", TagController.createTag);

TagsRouter.get("/tags/:id", TagController.getById);

export { TagsRouter }