import express from "express";
import { loginAdmin, refreshToken, logoutAdmin } from "../controllers/adminController.js";

const router = express.Router();

// ✅ Admin Login - returns access + refresh token
router.post("/login", loginAdmin);

// ✅ When access token expires → generate new one using refresh token
router.get("/refresh", refreshToken);

// ✅ Logout admin - clears refresh token cookie
router.post("/logout", logoutAdmin);

export default router;
