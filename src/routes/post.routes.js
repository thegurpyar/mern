import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { addPost,getAllPosts,editPost,deletePost, getPost } from "../controllers/post.controller.js";
const router = express.Router();


router.post("/", authMiddleware, addPost);


router.get("/", getAllPosts);

router.get("/:id", getPost);

router.put("/:id", authMiddleware, editPost);


router.delete("/:id", authMiddleware, deletePost);

export default router;
