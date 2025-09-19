const express = require("express");
const moment = require("moment");

const app = express();

const PORT = 8000;
const HOST = "localhost";

function getTime() {
    return moment().format("HH:mm:ss");
}

app.get("/", (req, res) => {
    res.json("hello");
});

app.get("/timestamp", (req, res) => {
    const currentTime = getTime();
    res.json({ timestamp: currentTime });
});

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
