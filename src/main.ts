import express from 'express'
import { PostRouter } from './Post/post.routes'

const app: express.Express = express()

app.use(express.json())
app.use(PostRouter)

const PORT = 8000;
const HOST = "localhost";



app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
