import { Request, Response } from 'express';
export interface Post {
    id: number;
    name: string;
    description: string;
    image: string;
    likes: number;
}
export type CreatePost = Omit<Post, 'id' | 'likes'>;
export type UpdatePost = Partial<Omit<Post, 'likes'>>; 

export interface PostServiceContract {
    getTimeDate: () => string;
    getAllPosts: (skip: number, take: number | null) => Post[];
    getById: (id: number) => Post | undefined;
    createPost: (data: CreatePost) => Promise<Post | null>;
    update: (id: number, data: UpdatePost) => Promise<Post | null>;
}

export interface PostControllerContract {
    getTimeDate: (req: Request, res: Response<object>) => void,
    getAllPosts: (req: Request<object, Post[] | string, object, {take?: number, skip?: number}>, res: Response<Post[] | string | object>) => void,
    getById: (req: Request<{id: string}, Post | string, object>, res: Response<Post | string | object>) => void,
    createPost: (req: Request<object, Post | string, CreatePost, object>, res: Response<Post | string | object | null>) => Promise<void>,
    update: (req: Request<{id: string}, Post | string, UpdatePost, object>, res: Response<Post | string | object>) => Promise<void>
}