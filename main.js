const path = require("path")
const fs = require("fs")
const express = require('express')
const moment = require("moment");

const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"))

function getTimeDate() {
    return moment().format("YYYY/MM/DD HH:mm:ss");
}
const app = express();

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

    let result = posts

    if (skip > 0) {
        result = result.slice(skip)
    }
    if (take !== null && take > 0) {
        result = result.slice(0, take)
    }

    res.json(result)
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
app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
