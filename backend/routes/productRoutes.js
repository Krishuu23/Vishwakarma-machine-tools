// backend/routes/productRoutes.js
import express from "express";
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
router.post("/", /* auth, */ createProduct);
router.put("/:id", /* auth, */ updateProduct);
router.delete("/:id", /* auth, */ deleteProduct);

export default router;
