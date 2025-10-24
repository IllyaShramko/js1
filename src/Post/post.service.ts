import moment from 'moment'
import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { Post, PostServiceContract, PostWithTags } from './post.types'
import { PrismaClient } from '../generated/prisma'

const client = new PrismaClient()

const postsPath = path.join(__dirname, "posts.json");
const posts: Post[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

export const PostService: PostServiceContract = {
    getTimeDate: () => {
        return moment().format("YYYY/MM/DD HH:mm:ss");
    },
    getAllPosts: async (skip, take) => {
        let posts_sorted = await client.post.findMany({})
        if (skip > 0) {
            posts_sorted = posts_sorted.slice(skip)
        }
        if (take && take > 0) {
            posts_sorted = posts_sorted.slice(0, take)
        }
        return posts_sorted
    },
    getById: async (id) => {
        try {
            const result = await client.post.findUnique({
                where: { id }
            })
            console.log("getById result:", result)
            return result
        } catch (error) {
            console.error("Error in getById:", error)
            return null
        }
    },
    createPost: async (data) => {
        try {
            const newPost = await client.post.create({
                data: {
                    likes: 0,
                    name: data.name,
                    description: data.description,
                    imageUrl: data.imageUrl || null,
                }
            })
            return newPost
        } catch (error) {
            console.error("Error in createPost:", error)
            return null
        }
    },
    async update(id, data) {
        const post = this.getById(id)
        if (!post) {
            console.log("Post not found")
            return null
        }
        try {
            const updatedPost = await client.post.update({
                where: { id },
                data: {
                    ...post,
                    ...data
                }
            })
            return updatedPost
        } catch (error) {
            console.error("Error in update:", error)
            return null
        }
    },
    async delete(id) {
        try {
            const post = await this.getById(id)
            if (!post) {
                console.log("Post not found")
                return "not found"
            }
            const deleted = await client.post.delete({
                where: { id }
            })
            return deleted
        } catch (error) {
            console.error("Error in delete:", error)
            return null
        }
    }
}
