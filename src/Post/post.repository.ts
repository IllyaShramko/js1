import { PostRepositoryContract } from "./post.types";
import { PrismaClient as PC, Prisma } from "../generated/prisma"; 

const PrismaClient = new PC()

export const PostRepository: PostRepositoryContract = {
    async getById(id, includeArray) {
        try {
            if (includeArray.includes("comments") && includeArray.includes("likedBy")) {
                const postWithComments = await PrismaClient.post.findUnique({
                    where: { id: id },
                    include: { 
                        likedBy: { include: { user: true } },
                        tags: { include: { tag: true } },
                        comments: { include: { user: true } },
                        createdBy: true
                    }
                })
                return postWithComments
            } else if (includeArray.includes("likedBy")) {
                const postWithLikes = await PrismaClient.post.findUnique({
                    where: { id: id },
                    include: { 
                        likedBy: { include: { user: true } },
                        tags: { include: { tag: true } }
                    }
                })
                return postWithLikes
            } else if (includeArray.includes("comments")) {
                const postFull =  await PrismaClient.post.findUnique({
                    where: { id: id },
                    include: { 
                        comments: { include: { user: true } },
                        tags: { include: { tag: true } }
                    }
                })
                return postFull
            }
            const product = await PrismaClient.post.findUnique({
                where:{id: id},
                include: { 
                    tags: { include: { tag: true } },
                }
            })
            console.log(id, product)
            return product
            
        } catch (error) {
            throw error
        }
    },
    async getAllPosts(take, skip) {
        const products = await PrismaClient.post.findMany({
            skip: skip,
            take: take,
            include: { tags: { include: { tag: true } } }
        })
        return products
    },
    async createPost(data, tagsIds) {
        if (!tagsIds) {
            return await PrismaClient.post.create({
                data: data,
                include: {tags:{ include: { tag: true }}}
            })
        }
        return await PrismaClient.post.create({
            data: {
                ...data,
                tags: { create:tagsIds.map((id) => ({
                    tag: {
                        connect: { id }
                    }
                }))}
            },
            include: {tags:{ include: { tag: true }}}
        })
    },
    async update(id, data) {
        return await PrismaClient.post.update({
            where: {
                id
            },
            data
        })
    },
    async delete(id) {
        return await PrismaClient.post.delete({where:{id}})
    },
    async commentPost(postId, userId, body) {
        return await PrismaClient.comment.create({
            data: {
                postId,
                userId,
                body
            }
        })
    },
    async likePost(postId, userId) {
        await PrismaClient.postLike.create({
            data: {
                postId,
                userId
            }
        })
        return null
    },
    async unlikePost(postId, userId) {
        await PrismaClient.postLike.delete({
            where: {
                userId_postId: {
                    postId: postId,
                    userId: userId
                }
            }
        })
        return null
    }
}   