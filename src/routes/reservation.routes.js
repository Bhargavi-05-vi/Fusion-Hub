import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createReservation,
  getMyReservations,
  cancelReservation,
  getRestaurantReservations,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createReservation
);

router.get(
  "/my-reservations",
  protect,
  authorizeRoles("customer"),
  getMyReservations
);

router.patch(
  "/cancel/:id",
  protect,
  authorizeRoles("customer"),
  cancelReservation
);

router.get(
  "/restaurant/:restaurantId",
  protect,
  authorizeRoles("restaurant", "admin"),
  getRestaurantReservations
);

export default router;