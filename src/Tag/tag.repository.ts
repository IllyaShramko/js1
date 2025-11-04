import { PrismaClient as PC, Prisma } from "../generated/prisma"; 
import { Tag, TagRepositoryContract } from "./tag.types";

const PrismaClient = new PC()

export const TagRepository: TagRepositoryContract = {
    async getAllTags(take, skip) {
        if (take && !skip){
            const tags = await PrismaClient.tag.findMany({
                take: take,
            })
            return tags
        } else if (!take && skip) {
            const tags = await PrismaClient.tag.findMany({
                skip: skip,
            })
            return tags
        } else if (take && skip) {
            const tags = await PrismaClient.tag.findMany({
                skip: skip,
                take: take
            })
            return tags
        }
        else{
            const tags = await PrismaClient.tag.findMany({}) 
            return tags
        }
    },
    async getById(id) {
        try {
            const tag = await PrismaClient.tag.findUnique({
                where:{id: id}
            })
            return tag
            
        } catch (error) {
            throw error
        }
    },
}