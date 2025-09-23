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
    res.status(200).json(posts)
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
