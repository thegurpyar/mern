import postModel from "../models/post.model.js";
import asyncHandler from "express-async-handler";

export const addPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Please Provide Title" });
  }
  const post = new postModel({ title, content, author: req.user.id });
  await post.save();
  return res.status(200).json({ post, message: "Post added successfully" });
});

export const getPost = asyncHandler(async (req, res) => {
  const id = req.params.id
  if(!id){
    return res.status(400).json({message:"Please provide id"})
  }
  const post = await postModel.findById(id).populate("author", "username").lean();


  return res.status(200).json({ post });
});

export const getAllPosts = asyncHandler(async (req, res) => {
  // Get page and limit from query parameters (with defaults)
  const page = parseInt(req.query.page) || 1;
  const limit =  10;
  
  // Calculate skip value for pagination
  const skip = (page - 1) * limit;
  
  // Count total documents for pagination metadata
  const totalPosts = await postModel.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);
  
  // Get paginated posts
  const posts = await postModel
    .find()
    .populate("author", "username")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // Add sorting (newest first)
  
  // Return paginated results with metadata
  return res.status(200).json({
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      postsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});

export const editPost = asyncHandler(async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post || post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();
  return res.status(200).json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post || post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  await post.deleteOne();
  res.json({ message: "Post deleted" });
});
