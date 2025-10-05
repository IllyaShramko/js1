const moment = require("moment");
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises");

const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"))

const PostService = {
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
            const newPost = {...data, id: posts}
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

module.exports = PostService