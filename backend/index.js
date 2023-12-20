import express, { urlencoded } from "express"
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({extended: true}));
app.use(express.static("public"))
app.use("/api/posts", postRoutes);
app.use(cookieParser());
app.use("/api/auth", authRoutes)

app.listen(8800, ()=>{
    console.log("Connected to backend")
})