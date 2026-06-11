import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  cancelMyOrder,
  assignDeliveryPartner,
} from "../controllers/order.controller.js";

const router = express.Router();

// Customer places an order
router.post("/", protect, authorizeRoles("customer", "admin"), createOrder);

// Customer sees their own orders
router.get("/my-orders", protect, getMyOrders);

// Get single order detail
router.get("/:id", protect, getSingleOrder);

// Customer cancels their own order (within 30 min)
router.patch("/:id/cancel", protect, authorizeRoles("customer", "admin"), cancelMyOrder);

// Restaurant/admin updates order status
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("restaurant", "admin"),
  updateOrderStatus
);

// Admin/restaurant assigns delivery partner
router.patch(
  "/:id/assign-delivery",
  protect,
  authorizeRoles("admin", "restaurant"),
  assignDeliveryPartner
);

export default router;
