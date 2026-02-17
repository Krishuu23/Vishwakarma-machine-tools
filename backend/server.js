// 🔥 GIT-DETECT-TEST-12345
// TEST CHANGE - DELETE LATER
console.log("RENDER DEPLOY CHECK", Date.now());
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // 👈 Missing import add karna tha

// ✅ Route imports
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// 🧩 Middleware Setup
// ===============================

// 🛡️ Use JSON + URL encoded body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🍪 Cookie Parser (for refresh tokens)
app.use(cookieParser());

// 🔐 Proper CORS setup (important for refresh tokens & auth)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vmtpackaging.com",
      "http://vmtpackaging.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
      "Expires"
    ],
  })
);


// ===============================
// 🚏 API Routes
// ===============================
app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});

// Public routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/enquiries", enquiryRoutes);

// Admin + Auth routes
app.use("/api/admin", adminRoutes);


// ===============================
// 💾 MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
