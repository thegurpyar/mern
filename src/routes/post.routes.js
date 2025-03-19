import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { addPost,getAllPosts,editPost,deletePost } from "../controllers/post.controller.js";
const router = express.Router();


router.post("/", authMiddleware, addPost);

// Get all posts
router.get("/", getAllPosts);


router.put("/:id", authMiddleware, editPost);


router.delete("/:id", authMiddleware, deletePost);

export default router;
