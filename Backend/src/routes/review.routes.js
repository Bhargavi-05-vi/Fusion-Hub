import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createReview,
  getRestaurantReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("customer", "admin"),
  createReview
);

router.get(
  "/:restaurantId",
  getRestaurantReviews
);

export default router;
