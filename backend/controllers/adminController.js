import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// ✅ Create Access Token (Short-lived)
const generateAccessToken = (admin) => {
  return jwt.sign(admin, ACCESS_SECRET, { expiresIn: "15m" });
};

// ✅ Create Refresh Token (Long-lived)
const generateRefreshToken = (admin) => {
  return jwt.sign(admin, REFRESH_SECRET, { expiresIn: "7d" });
};

// ✅ ADMIN LOGIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const adminData = { email };

    const accessToken = generateAccessToken(adminData);
    const refreshToken = generateRefreshToken(adminData);

    // ✅ Store Refresh Token in HttpOnly Cookie
    res.cookie("admin_refresh_token", refreshToken, {
      httpOnly: true,
      secure: false, // ✅ true in production with HTTPS
      sameSite: "strict",
      path: "/", 
    });

    return res.json({
      success: true,
      message: "Login successful",
      accessToken,
      admin: adminData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ REFRESH TOKEN: Issue new Access Token
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.admin_refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, admin) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken({ email: admin.email });

    return res.json({ accessToken: newAccessToken });
  });
};

// ✅ LOGOUT ADMIN
export const logoutAdmin = (req, res) => {
  res.clearCookie("admin_refresh_token", {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
    path: "/",
  });

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

