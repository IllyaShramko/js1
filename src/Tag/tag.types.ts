import { Prisma } from '../generated/prisma'
import { Request, Response } from 'express'
export type Tag = Prisma.TagGetPayload<{}>

export interface TagServiceContract {
    getAllTags: (skip?: number, take?: number) => Promise<Tag[]>
    getById: (id: number) => Promise<Tag | null>,
    createTag: (name: string) => Promise<Tag | null>
}

export interface TagRepositoryContract {
    getAllTags: (take?: number, skip?: number) => Promise<Tag[]>
    getById: (id: number) => Promise<Tag | null>,
    createTag: (name: string) => Promise<Tag>
}

export interface TagControllerContract {
    getAllTags: (req: Request<object, Tag[] | string, object, {take?: number; skip?: number}>, res: Response<Tag[] | string | object>) => Promise<void>
    getById: (req: Request<{id: string}, Tag | string, object>, res: Response<Tag | string | object | null>) => void,
    createTag: (req: Request<object, Tag | string, {name: string}, object>, res: Response<Tag | string>) => Promise<void>
}