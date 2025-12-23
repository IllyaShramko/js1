import { PostRepositoryContract } from "./post.types";
import { PrismaClient as PC, Prisma } from "../generated/prisma"; 

const PrismaClient = new PC()

export const PostRepository: PostRepositoryContract = {
    async getById(id) {
        try {
            const product = await PrismaClient.post.findUnique({
                where:{id: id},
                include: { tags: { include: { tag: true } } }
            })
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
    }
}