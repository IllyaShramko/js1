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

export type CreatePostWithTags = {
    postData: CreatePostChecked
    tagsIds?: number[]
}

export type UpdatePostWithTags = {
    postData: UpdatePostChecked
    tagsIds?: number[]
}

export interface PostServiceContract {
    getTimeDate: () => string
    getAllPosts: (skip?: number, take?: number) => Promise<PostWithTags[]>
    getById: (id: number) => Promise<PostWithTags | null>
    createPost: (data: CreatePost, tagsIds?: number[]) => Promise<Post | null>
    update: (id: number, data: UpdatePostChecked) => Promise<Post | null>
    delete: (id: number) => Promise<Post | null | string>
}

export interface PostRepositoryContract {
    getAllPosts: (take?: number, skip?: number) => Promise<PostWithTags[]>
    getById: (id: number) => Promise<PostWithTags | null>
    createPost: (data: CreatePost, tagsIds?: number[]) => Promise<Post>
    update: (id: number, data: UpdatePost) => Promise<Post | null>
    delete: (id: number) => Promise<Post | null | string>
}

export interface PostControllerContract {
    getTimeDate: (req: Request, res: Response<object>) => void
    getAllPosts: (req: Request<object, PostWithTags[] | string, object, {take?: number; skip?: number}>, res: Response<PostWithTags[] | string | object>) => Promise<void>
    getById: (req: Request<{id: string}, PostWithTags | string, object>, res: Response<PostWithTags | string | object | null>) => void,
    createPost: (req: Request<object, PostWithTags | string, CreatePostWithTags, object>, res: Response<PostWithTags | string | object | null>) => Promise<void>
    update: (req: Request<{ id: string }, PostWithTags | string, UpdatePostWithTags, object>, res: Response<PostWithTags | string | object>) => Promise<void>
    delete: (req: Request<{ id: string }, PostWithTags | string, object>, res: Response<PostWithTags | string | object>) => Promise<void>
}