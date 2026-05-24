import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createMenuItem,
  getRestaurantMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.get("/:restaurantId", getRestaurantMenu);

router.post(
  "/",
  protect,
  authorizeRoles("restaurant", "admin"),
  createMenuItem
);

router.put(
  "/:id",
  protect,
  authorizeRoles("restaurant", "admin"),
  updateMenuItem
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("restaurant", "admin"),
  deleteMenuItem
);

export default router;