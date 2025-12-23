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
    getById: async (id, includeArray) => {
        return PostRepository.getById(id, includeArray)
    },
    createPost: async (data, tagsIds) => {
        return PostRepository.createPost(data, tagsIds)
    },
    async update(id, data) {
        return PostRepository.update(id, data)
    },
    async delete(id) {
        return PostRepository.delete(id)
    },
    async commentPost(postId, userId, content) {
        return PostRepository.commentPost(postId, userId, content)
    },
    async likePost(postId, userId) {
        return PostRepository.likePost(postId, userId)
    },
    async unlikePost(postId, userId) {
        return PostRepository.unlikePost(postId, userId)
    }
}
