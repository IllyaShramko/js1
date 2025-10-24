import { Prisma, Tag, PostTag } from '../generated/prisma'
import { Request, Response } from 'express'

export type Post = Prisma.PostGetPayload<{}>

export type PostWithTags = Prisma.PostGetPayload<{include: { PostTag: { include: { tag: true } } }}>

export type CreatePost = Prisma.PostCreateInput
export type CreatePostChecked = Required<Pick<CreatePost, 'name' | 'description'>> & {imageUrl?: string}

export type UpdatePost = Prisma.PostUpdateInput
export type UpdatePostChecked = Partial<CreatePostChecked>

export interface PostServiceContract {
    getTimeDate: () => string
    getAllPosts: (skip: number, take?: number) => Promise<Post[]>
    getById: (id: number) => Promise<Post | null>
    createPost: (data: CreatePostChecked) => Promise<Post | null>
    update: (id: number, data: UpdatePostChecked) => Promise<Post | null>
    delete: (id: number) => Promise<Post | null | string>
}

export interface PostControllerContract {
    getTimeDate: (req: Request, res: Response<object>) => void
    getAllPosts: (req: Request<object, Post[] | string, object, {take?: number; skip: number}>, res: Response<Post[] | string | object>) => void
    getById: (req: Request<{ id: string }, Post | string, object>, res: Response<Post | string | object>) => void
    createPost: (req: Request<object, Post | string, CreatePostChecked, object>, res: Response<Post | string | object | null>) => Promise<void>
    update: (req: Request<{ id: string }, Post | string, UpdatePostChecked, object>, res: Response<Post | string | object>) => Promise<void>
    delete: (req: Request<{ id: string }, Post | string, object>, res: Response<Post | string | object>) => Promise<void>
}