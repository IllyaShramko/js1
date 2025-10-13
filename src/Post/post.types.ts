export interface Post {
    id: number;
    name: string;
    description: string;
    image: string;
    likes: number;
}
export type CreatePost = Omit<Post, 'id' | 'likes'>;
export type UpdatePost = Partial<Omit<Post, 'id'>>; 

export interface PostServiceContract {
    getTimeDate: () => string;
    getAllPosts: (skip: number, take: number | null) => Post[];
    getById: (id: number) => Post | undefined;
    createPost: (data: CreatePost) => Promise<Post | null>;
    update: (id: number, data: UpdatePost) => Promise<Post | null>;
}