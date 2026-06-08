import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import Order from "./models/Order.js";
import MenuItem from "./models/MenuItem.js";
import Restaurant from "./models/Restaurant.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

// ── CORS ───────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body Parser ────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Health Check ───────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀FusionHub Backend Running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ─────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/admin", adminRoutes);

// ── TEMP TEST ROUTE (no token needed) ─────────────────
app.post("/api/test/order", async (req, res) => {
  try {
    const {
      restaurantName,
      itemName,
      itemPrice,
      quantity,
      deliveryAddress,
    } = req.body;

    // Restaurant dhundo ya banao
    let restaurant = await Restaurant.findOne({ name: restaurantName });
    if (!restaurant) {
      restaurant = await Restaurant.create({
        owner: new mongoose.Types.ObjectId(),
        name: restaurantName || "Test Restaurant",
        address: "Test Address, Patna",
        location: {
          type: "Point",
          coordinates: [85.1376, 25.5941],
        },
      });
    }

    // MenuItem dhundo ya banao
    let menuItem = await MenuItem.findOne({
      restaurant: restaurant._id,
      name: itemName,
    });
    if (!menuItem) {
      menuItem = await MenuItem.create({
        restaurant: restaurant._id,
        name: itemName || "Test Item",
        price: itemPrice || 100,
        category: "Test",
      });
    }

    // Order seedha save karo
    const order = await Order.create({
      customer: new mongoose.Types.ObjectId(),
      restaurant: restaurant._id,
      items: [
        {
          menuItem: menuItem._id,
          quantity: quantity || 1,
          price: menuItem.price,
        },
      ],
      totalAmount: menuItem.price * (quantity || 1),
      deliveryAddress: deliveryAddress || "Test Address, Patna",
      paymentMethod: "cash",
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("restaurant", "name address")
      .populate("items.menuItem", "name price");

    res.status(201).json({
      success: true,
      message: "✅ Order successfully saved in MongoDB!",
      order: populatedOrder,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ── 404 Handler ────────────────────────────────────────
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ───────────────────────────────
app.use(errorHandler);

export default app;
