import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  logoutUser,
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ── Public Routes ──────────────────────────────────────
router.post("/register", registerUser);          // RegisterPage
router.post("/login", loginUser);                // LoginPage
router.post("/admin-login", adminLogin);         // AdminLoginPage
router.post("/forgot-password", forgotPassword); // ForgotPasswordPage
router.post("/reset-password", resetPassword);   // ResetPasswordPage

// ── Protected Routes (JWT required) ────────────────────
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/logout", protect, logoutUser);

export default router;
