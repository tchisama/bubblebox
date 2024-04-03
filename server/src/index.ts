import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { filesystemRoutes } from "./routes/filesystem";

const app = new Elysia()
    .use(cors())

app.group("/filesystem",(app)=> app.use(filesystemRoutes))
app.listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);







