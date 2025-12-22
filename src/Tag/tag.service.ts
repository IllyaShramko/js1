import moment from 'moment'
import { Tag, TagServiceContract } from './tag.types'
import { PrismaClient } from '../generated/prisma'
import { TagRepository } from './tag.repository'

export const TagService: TagServiceContract = {
    getAllTags: async (skip, take) => {
            return TagRepository.getAllTags(take, skip)
        },
    getById: async (id) => {
        return TagRepository.getById(id)
    },
    createTag: async (name) => {
        return TagRepository.createTag(name)
    }
}