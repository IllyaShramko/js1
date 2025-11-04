import { PostRepositoryContract } from "./post.types";
import { PrismaClient as PC, Prisma } from "../generated/prisma"; 

const PrismaClient = new PC()

export const PostRepository: PostRepositoryContract = {
    async getById(id) {
        try {
            const product = await PrismaClient.post.findUnique({
                where:{id: id}
            })
            return product
            
        } catch (error) {
            throw error
        }
    },
    async getAllPosts(take, skip) {
        if (take && !skip){
            const products = await PrismaClient.post.findMany({
                take: take,
            })
            return products
        } else if (!take && skip) {
            const products = await PrismaClient.post.findMany({
                skip: skip,
            })
            return products
        } else if (take && skip) {
            const products = await PrismaClient.post.findMany({
                skip: skip,
                take: take
            })
            return products
        }
        else{
            const products = await PrismaClient.post.findMany({}) 
            return products
        }
    },
    async createPost(data) {
        return await PrismaClient.post.create({data})
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