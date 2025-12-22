import { Prisma, Tag, PostTag } from '../generated/prisma'
import { Request, Response } from 'express'

export type Post = Prisma.PostGetPayload<{}>

export type PostWithTags = Prisma.PostGetPayload<{include: { tags: { include: { tag: true } } }}>

export type PostWithAuthor = Prisma.PostGetPayload<{include: { createdBy: true }}>

export type PostFull = Prisma.PostGetPayload<{include: { createdBy: true, tags: { include: { tag: true } } }}>

export type CreatePost = Prisma.PostUncheckedCreateInput
export type CreatePostChecked = Prisma.PostCreateInput

export type UpdatePost = Prisma.PostUncheckedUpdateInput
export type UpdatePostChecked = Prisma.PostUpdateInput

export interface PostServiceContract {
    getTimeDate: () => string
    getAllPosts: (skip?: number, take?: number) => Promise<PostWithTags[]>
    getById: (id: number) => Promise<PostWithTags | null>
    createPost: (data: CreatePost) => Promise<Post | null>
    update: (id: number, data: UpdatePostChecked) => Promise<Post | null>
    delete: (id: number) => Promise<Post | null | string>
}

export interface PostRepositoryContract {
    getAllPosts: (take?: number, skip?: number) => Promise<PostWithTags[]>
    getById: (id: number) => Promise<PostWithTags | null>
    createPost: (data: CreatePost) => Promise<Post>
    update: (id: number, data: UpdatePost) => Promise<Post | null>
    delete: (id: number) => Promise<Post | null | string>
}

export interface PostControllerContract {
    getTimeDate: (req: Request, res: Response<object>) => void
    getAllPosts: (req: Request<object, PostWithTags[] | string, object, {take?: number; skip?: number}>, res: Response<Post[] | string | object>) => Promise<void>
    getById: (req: Request<{id: string}, PostWithTags | string, object>, res: Response<Post | string | object | null>) => void,
    createPost: (req: Request<object, Post | string, CreatePostChecked, object>, res: Response<Post | string | object | null>) => Promise<void>
    update: (req: Request<{ id: string }, Post | string, UpdatePostChecked, object>, res: Response<Post | string | object>) => Promise<void>
    delete: (req: Request<{ id: string }, Post | string, object>, res: Response<Post | string | object>) => Promise<void>
}