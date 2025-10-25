import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { createBlog, getAllBlogs, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

// POST new blog (admin)
router.post("/", protectAdmin,  createBlog);

// GET all blogs (public + admin)
router.get("/", getAllBlogs);

// DELETE a blog (admin)
router.delete("/:id", protectAdmin, deleteBlog);

export default router;
