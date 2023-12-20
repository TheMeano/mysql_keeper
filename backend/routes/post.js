import express from "express";
import { addPost, deleteAll, deletePost, getPosts, updatePost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)
router.delete("/", deleteAll);

export default router;