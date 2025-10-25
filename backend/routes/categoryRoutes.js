import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

// Public
router.get("/", getCategories);

// Protected (for admin panel)
router.post("/", protectAdmin, createCategory);
router.put("/:id", protectAdmin, updateCategory);
router.delete("/:id", protectAdmin, deleteCategory);

export default router;
