import moment from 'moment'
import { Post, PostServiceContract, PostWithTags } from './post.types'
import { PrismaClient } from '../generated/prisma'
import { PostRepository } from './post.repository'
const client = new PrismaClient()

export const PostService: PostServiceContract = {
    getTimeDate: () => {
        return moment().format("YYYY/MM/DD HH:mm:ss");
    },
    getAllPosts: async (skip, take) => {
        return PostRepository.getAllPosts(take, skip)
    },
    getById: async (id) => {
        return PostRepository.getById(id)
    },
    createPost: async (data) => {
        return PostRepository.createPost(data)
    },
    async update(id, data) {
        return PostRepository.update(id, data)
    },
    async delete(id) {
        return PostRepository.delete(id)
    }
}
