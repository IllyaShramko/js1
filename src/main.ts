import express from 'express'
import { PostRouter } from './Post/post.routes'
import { TagsRouter } from './Tag/tag.routes'
import { UserRouter } from './User/user.routes'
const app: express.Express = express()

app.use(express.json())
app.use(PostRouter)
app.use(TagsRouter)
app.use(UserRouter)

const PORT = 8000;
const HOST = "localhost";



app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});
