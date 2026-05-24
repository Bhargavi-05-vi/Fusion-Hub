import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  getDashboardStats,
  getAllUsers,
  getAllRestaurantsAdmin,
  getAllOrdersAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/restaurants",
  protect,
  authorizeRoles("admin"),
  getAllRestaurantsAdmin
);

router.get(
  "/orders",
  protect,
  authorizeRoles("admin"),
  getAllOrdersAdmin
);

export default router;