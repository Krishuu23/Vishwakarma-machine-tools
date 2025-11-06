// backend/controllers/productController.js
import Product from "../models/Product.js";
import Category from "../models/Category.js";

/**
 * ✅ Create a new product
 * POST /api/products
 */
export const createProduct = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    // ✅ Cloudinary URL
    const imageUrl = req.file?.path;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Name and category are required.",
      });
    }

    // ✅ Check if category exists
    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    // ✅ Create Product with Image URL
    const product = new Product({
      name,
      description,
      image: imageUrl || null, // ✅ Cloudinary URL stored
      category,
    });

    await product.save();

    // ✅ Populate category field in response
    const populatedProduct = await Product.findById(product._id).populate(
      "category",
      "name"
    );

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (err) {
    console.error("createProduct error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

/** * ✅ Get all products * GET /api/products */ export const getProducts = async (req, res) => { try { const products = await Product.find() .populate("category", "name") .sort({ createdAt: -1 }); return res.status(200).json({ success: true, count: products.length, data: products }); } catch (err) { console.error("getProducts error:", err); return res.status(500).json({ success: false, message: "Server error", error: err.message }); } };

/**
 * ✅ Get products by category
 * GET /api/products/category/:categoryId
 */
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    console.error("getProductsByCategory error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/**
 * ✅ Delete product
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
