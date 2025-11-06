import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  getProductsByCategory,
  deleteProduct
} from "../controllers/productController.js";
import createUpload from "../middleware/upload.js";

const router = express.Router();
const uploadProductImage = createUpload("products");

/**
 * 🟢 Public Routes
 */

// Get all products
router.get("/", getProducts);

// Get products by category
router.get("/category/:categoryId", getProductsByCategory);


/**
 * 🔒 Admin-Protected Routes
 * (use protectAdmin for these)
 */

// Create new product
router.post("/", protectAdmin,uploadProductImage.single("image"), createProduct);

// Delete a product
router.delete("/:id", protectAdmin, deleteProduct);

export default router;
