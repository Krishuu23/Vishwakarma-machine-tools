import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Enquiry from "./models/Enquiry.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newEnquiry = new Enquiry({ name, email, phone, message });
    await newEnquiry.save();
    res.status(201).json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error submitting enquiry", error: err });
  }
});


// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
