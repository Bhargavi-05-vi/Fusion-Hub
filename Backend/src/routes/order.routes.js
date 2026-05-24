import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  assignDeliveryPartner,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("customer"), createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getSingleOrder);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("restaurant", "admin"),
  updateOrderStatus
);

router.patch(
  "/:id/assign-delivery",
  protect,
  authorizeRoles("admin", "restaurant"),
  assignDeliveryPartner
);

export default router;