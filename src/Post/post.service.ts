import moment from 'moment'
import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { Post, PostServiceContract } from './post.types'


const postsPath = path.join(__dirname, "posts.json");
const posts: Post[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

export const PostService: PostServiceContract = {
    getTimeDate: () => {
        return moment().format("YYYY/MM/DD HH:mm:ss");
    },
    getAllPosts: (skip, take) => {
        let posts_sorted = posts

        if (skip > 0) {
            posts_sorted = posts_sorted.slice(skip)
        }
        if (take !== null && take > 0) {
            posts_sorted = posts_sorted.slice(0, take)
        }
        return posts_sorted
    },
    getById: (id) => {
        const post = posts.find((pr)=>{
            return pr.id === id
        })
        return post
    },
    createPost: async (data) => {
        try{
            const newPost = {...data, id: posts.length + 1, likes: 0}
            posts.push(newPost)
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
            console.log(newPost)
            return newPost
        } catch (error){
            console.log(error)
            return null
        }
    },
    async update(id, data) {
        const post = this.getById(id)
        if (!post) {
            return null
        }

        try {
            // {...post, {name: "Super post"}}
            const updatedPost = { ...post, ...data }
            posts.splice(id - 1, 1, updatedPost)
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
            return updatedPost
        } catch (error) {
            console.log(error)
            return null
        }
    },
}
