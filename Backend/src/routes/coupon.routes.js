import express from "express";
import { validateCoupon } from "../controllers/coupon.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Only authenticated users can validate coupons
router.post("/validate", protect, validateCoupon);

export default router;