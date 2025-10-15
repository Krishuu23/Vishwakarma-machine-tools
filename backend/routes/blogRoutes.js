import express from "express";
import { createBlog, getAllBlogs, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

// POST new blog (admin)
router.post("/", createBlog);

// GET all blogs (public + admin)
router.get("/", getAllBlogs);

// DELETE a blog (admin)
router.delete("/:id", deleteBlog);

export default router;
