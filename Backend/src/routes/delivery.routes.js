import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  getAssignedOrders,
  acceptDelivery,
  markDelivered,
  updateDeliveryLocation,
} from "../controllers/delivery.controller.js";

const router = express.Router();

router.get(
  "/assigned-orders",
  protect,
  authorizeRoles("delivery"),
  getAssignedOrders
);

router.patch(
  "/accept/:id",
  protect,
  authorizeRoles("delivery"),
  acceptDelivery
);

router.patch(
  "/delivered/:id",
  protect,
  authorizeRoles("delivery"),
  markDelivered
);

router.post(
  "/location",
  protect,
  authorizeRoles("delivery"),
  updateDeliveryLocation
);

export default router;