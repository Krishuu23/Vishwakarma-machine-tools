// backend/controllers/productController.js
import Product from "../models/Product.js";
import Category from "../models/Category.js";

/**
 * Create a new product
 * POST /api/products
 */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    // optional: check required fields
    if (!name || !category) {
      return res.status(400).json({ success: false, message: "Name and category are required." });
    }

    // validate category exists (good practice)
    const cat = await Category.findById(category);
    if (!cat) return res.status(400).json({ success: false, message: "Invalid category ID." });

    const product = new Product({ name, description, price, image, category });
    await product.save();

    // populate category for response
    const populated = await product.populate("category").execPopulate?.() ?? await Product.findById(product._id).populate("category");

    return res.status(201).json({ success: true, product: populated });
  } catch (err) {
    console.error("createProduct error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/**
 * Get all products (optionally filter by category via query ?category=<id>)
 * GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (q) filter.$or = [
      { name: new RegExp(q, "i") },
      { description: new RegExp(q, "i") }
    ];

    // populate category so frontend gets category object instead of id
    const products = await Product.find(filter).populate("category").sort({ createdAt: -1 });
    return res.json({ success: true, count: products.length, products });
  } catch (err) {
    console.error("getProducts error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/**
 * Get single product by id
 * GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    return res.json({ success: true, product });
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/**
 * Update a product
 * PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;

    if (category) {
      const cat = await Category.findById(category);
      if (!cat) return res.status(400).json({ success: false, message: "Invalid category ID." });
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, category },
      { new: true, runValidators: true }
    ).populate("category");

    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });
    return res.json({ success: true, product: updated });
  } catch (err) {
    console.error("updateProduct error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/**
 * Delete product
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });
    return res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
