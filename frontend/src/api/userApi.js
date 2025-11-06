// src/api/userApi.js

import axios from "axios";

// 🔹 Base URL of your backend (change this according to your backend)
const BASE_URL = "http://localhost:5000/api";

// ✅ Create a reusable axios instance (optional but clean)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
     "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0"
  },
});

/* -------------------------------------------------------------------------- */
/*                              📦 PRODUCT APIs                               */
/* -------------------------------------------------------------------------- */

// Get all products (public)
export const getAllProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching all products:", err);
    throw err;
  }
};

// Get a single product by ID
// export const getProductById = async (productId) => {
//   try {
//     const res = await api.get(`/products/${productId}`);
//     return res.data;
//   } catch (err) {
//     console.error("❌ Error fetching product:", err);
//     throw err;
//   }
// };

export const getProductsByCategory = async (categoryId) => {
  try {
    const res = await api.get(`/products/category/${categoryId}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching products by category:", err);
    throw err;
  }
};

export const getCategories = async () => { // Removed `orderData` parameter
  try {
    const res = await api.get("/categories");
    // 🎯 FIX: Return the array found within the 'data' key of the response.
    return res.data.data; 
  } catch (err) {
    console.error("❌ Error getting categories:", err);
    throw err;
  }
};

// Fetch all orders (for user view — public here)
export const getBlogs = async () => {
  try {
    const res = await api.get("/blogs");
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching blogs:", err);
    throw err;
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await api.get(`/blogs/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching single blog:", err);
    throw err;
  }
};



/* -------------------------------------------------------------------------- */
/*                              🧭 CATEGORY APIs                              */
/* -------------------------------------------------------------------------- */

// Get all categories (like veg / non-veg)
export const sendInquiry = async (inquiryData) => {
  try {
    const res = await api.post("/enquiries", inquiryData);
    return res.data;
  } catch (err) {
    console.error("❌ Error sending enquiry:", err);
    throw err;
  }
};
