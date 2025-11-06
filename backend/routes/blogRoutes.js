import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { createBlog, getBlogById, getAllBlogs, deleteBlog } from "../controllers/blogController.js";
import createUpload from "../middleware/upload.js";

const router = express.Router();
const uploadBlogImage = createUpload("blogs");

// POST new blog (admin)
router.post("/", protectAdmin, uploadBlogImage.single("image"), createBlog);

// GET all blogs (public + admin)
router.get("/", getAllBlogs);

// ✅ GET single blog by ID (public)
router.get("/:id", getBlogById);

// DELETE a blog (admin)
router.delete("/:id", protectAdmin, deleteBlog);

export default router;
