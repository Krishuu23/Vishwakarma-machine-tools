// backend/routes/productRoutes.js
import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

// import auth middleware later and use for protected routes
// import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected (admin) - add auth middleware when ready
router.post("/", protectAdmin , createProduct);
router.put("/:id", protectAdmin, updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);

export default router;
