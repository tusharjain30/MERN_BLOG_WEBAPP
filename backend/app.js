import express from "express"
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import connectDB from "./connection/dbConnect.js";
const app = express();

config({
    path: '.env'
})

app.use(cors({
    origin: process.env.FRONT_END_URL,
    method: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/blog', blogRouter)

connectDB()
app.use(errorMiddleware)

export default app;