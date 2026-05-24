import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getNearbyRestaurants,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getAllRestaurants);
router.get("/nearby", getNearbyRestaurants);
router.get("/:id", getRestaurantById);

router.post(
  "/",
  protect,
  authorizeRoles("restaurant", "admin"),
  createRestaurant
);

router.put(
  "/:id",
  protect,
  authorizeRoles("restaurant", "admin"),
  updateRestaurant
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("restaurant", "admin"),
  deleteRestaurant
);

export default router;