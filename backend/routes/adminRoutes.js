import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// POST - Register (only one time for initial setup)
router.post("/register", registerAdmin);

// POST - Login
router.post("/login", loginAdmin);

export default router;
