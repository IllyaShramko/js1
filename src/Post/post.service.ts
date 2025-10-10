import moment from 'moment'
import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'


const postsPath = path.join(__dirname, "posts.json");
const posts: {
    id: number,
    name: string,
    description: string,
    image: string,
    likes: number
}[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

export const PostService = {
    getTimeDate: () => {
        return moment().format("YYYY/MM/DD HH:mm:ss");
    },
    getAllPosts: (skip: number, take: number | null) => {
        let posts_sorted = posts

        if (skip > 0) {
            posts_sorted = posts_sorted.slice(skip)
        }
        if (take !== null && take > 0) {
            posts_sorted = posts_sorted.slice(0, take)
        }
        return posts_sorted
    },
    getById: (id: number) => {
        const post = posts.find((pr)=>{
            return pr.id === id
        })
        return post
    },
    createPost: async (data: {name: string, description: string, image: string}) => {
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
    }
}
