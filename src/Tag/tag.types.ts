import { Prisma } from '../generated/prisma'
import { Request, Response } from 'express'
export type Tag = Prisma.TagGetPayload<{}>

export interface TagServiceContract {
    getAllTags: (skip?: number, take?: number) => Promise<Tag[]>
    getById: (id: number) => Promise<Tag | null>
}

export interface TagRepositoryContract {
    getAllTags: (take?: number, skip?: number) => Promise<Tag[]>
    getById: (id: number) => Promise<Tag | null>
}

export interface TagControllerContract {
    getAllTags: (req: Request<object, Tag[] | string, object, {take?: number; skip?: number}>, res: Response<Tag[] | string | object>) => Promise<void>
    getById: (req: Request<{id: string}, Tag | string, object>, res: Response<Tag | string | object | null>) => void,
}