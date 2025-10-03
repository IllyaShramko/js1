const path = require("path")
const fs = require("fs")
const express = require('express')
const moment = require("moment");
const fsPromises = require("fs/promises")

const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"))

function getTimeDate() {
    return moment().format("YYYY/MM/DD HH:mm:ss");
}
const app = express();
app.use(express.json())

const PORT = 8000;
const HOST = "localhost";

app.get("/", (req, res) => {
    res.json("hello");
});

app.get("/timestamp", (req, res) => {
    const currentTime = getTimeDate();
    res.json({ timestamp: currentTime });
});

app.get("/posts", (req, res) => {
    let skip
    let take

    if (req.query.skip !== undefined) {
        skip = +req.query.skip
        if (isNaN(skip)) {
            return res.status(400).json({ error: "skip must be a number" })
        }
    } else {
        skip = 0
    }

    if (req.query.take !== undefined) {
        take = +req.query.take
        if (isNaN(take)) {
            return res.status(400).json({ error: "take must be a number" })
        }
    } else {
        take = null
    }

    let posts_sorted = posts

    if (skip > 0) {
        posts_sorted = posts_sorted.slice(skip)
    }
    if (take !== null && take > 0) {
        posts_sorted = posts_sorted.slice(0, take)
    }

    res.status(200).json(posts_sorted)
})

app.get("/posts/:id",(req, res)=>{

    const id = +req.params.id
    if (isNaN(id)){
        res.status(400).json("id must be an integer");
        return;
    }
    const post = posts.find((pr)=>{
        return pr.id === id
    })
    if (!post){
        res.status(404).json("post not found")
        return;
    }

    res.json(post)
})

app.post("/posts", async (req, res) => {
    console.log(req.body)
    const body = req.body
    if (!body) {
        res.status(422).json("Body is required.")
        return
    }
    const newPost = { ...body, id: posts.length + 1, likes: 0 }
    if (!newPost.name) {
        res.status(422).json("name is required.")
        return
    }
    if (!newPost.description) {
        res.status(422).json("description is required.")
        return
    }
    if (!newPost.image) {
        res.status(422).json("image url is required.")
        return
    }

    try{
        posts.push(newPost)
        await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
        console.log(newPost)
        res.status(201).json(newPost)
    } catch (error){
        console.log(error)
        res.status(500).json("Post creation error")
    }
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
