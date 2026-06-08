import mongoose from "mongoose";
import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";
import { getIO } from "../config/socket.js";

// Helper: strict MongoDB ObjectId check (catches numbers, short strings etc.)
const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(String(id));


// Create order - customer places an order
export const createOrder = async (req, res, next) => {
  try {
    const {
      restaurantId,
      items,
      deliveryAddress,
      paymentMethod,
    } = req.body;

    // Basic validation
    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "restaurantId is required",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "items array is required and cannot be empty",
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "deliveryAddress is required",
      });
    }

    // Validate restaurantId format
    if (!isValidObjectId(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid restaurantId format. Must be a valid MongoDB ObjectId (24 char hex string)",
      });
    }

    // Check restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Check restaurant is open
    if (!restaurant.isOpen) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is currently closed",
      });
    }

    // Build order items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      // Validate menuItemId
      if (!item.menuItemId || !isValidObjectId(item.menuItemId)) {
        return res.status(400).json({
          success: false,
          message: `Invalid menuItemId: ${item.menuItemId}`,
        });
      }

      // Validate quantity
      if (!item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Each item must have a quantity of at least 1",
        });
      }

      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: `MenuItem not found: ${item.menuItemId}`,
        });
      }

      // Check menu item belongs to the restaurant
      if (menuItem.restaurant.toString() !== restaurantId) {
        return res.status(400).json({
          success: false,
          message: `MenuItem ${menuItem.name} does not belong to this restaurant`,
        });
      }

      // Check menu item is available
      if (!menuItem.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `MenuItem ${menuItem.name} is currently unavailable`,
        });
      }

      totalAmount += menuItem.price * item.quantity;

      orderItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    // Create order in database
    const order = await Order.create({
      customer: req.user._id,
      restaurant: restaurantId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || "cash",
    });

    // Populate the order before sending response
    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email")
      .populate("restaurant", "name address")
      .populate("items.menuItem", "name price");

    // Notify restaurant owner via socket
    try {
      const io = getIO();
      io.to(restaurant.owner.toString()).emit("new-order", {
        message: "New order received",
        order: populatedOrder,
      });
    } catch (socketError) {
      // Socket error should not fail the order creation
      console.error("Socket notification error:", socketError.message);
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder,
    });

  } catch (error) {
    next(error);
  }
};


// Get logged in customer's orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("restaurant", "name address image")
      .populate("items.menuItem", "name price image")
      .sort({ createdAt: -1 }); // Latest orders first

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    next(error);
  }
};


// Get single order by id
export const getSingleOrder = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
      });
    }

    const order = await Order.findById(req.params.id)
      .populate("customer", "name email")
      .populate("restaurant", "name address image")
      .populate("deliveryPartner", "name email")
      .populate("items.menuItem", "name price image");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow customer, restaurant owner, delivery partner, or admin
    const userId = req.user._id.toString();
    const isCustomer = order.customer._id.toString() === userId;
    const isAdmin = req.user.role === "admin";

    if (!isCustomer && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    next(error);
  }
};


// Update order status (restaurant/admin only)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
      });
    }

    const validStatuses = ["PLACED", "ACCEPTED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate("customer", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    // Notify customer via socket
    try {
      const io = getIO();
      io.to(order.customer.toString()).emit("order-status-updated", {
        message: "Your order status has been updated",
        status,
        orderId: order._id,
      });
    } catch (socketError) {
      console.error("Socket notification error:", socketError.message);
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    next(error);
  }
};


// Assign delivery partner
export const assignDeliveryPartner = async (req, res, next) => {
  try {
    const { deliveryPartnerId } = req.body;

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
      });
    }

    if (!deliveryPartnerId || !isValidObjectId(deliveryPartnerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid deliveryPartnerId format",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.deliveryPartner = deliveryPartnerId;
    order.status = "OUT_FOR_DELIVERY";
    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate("customer", "name email")
      .populate("restaurant", "name")
      .populate("deliveryPartner", "name email")
      .populate("items.menuItem", "name price");

    // Notify delivery partner and customer via socket
    try {
      const io = getIO();
      io.to(deliveryPartnerId).emit("delivery-assigned", {
        message: "New delivery assigned to you",
        order: updatedOrder,
      });
      io.to(order.customer.toString()).emit("order-status-updated", {
        message: "Delivery partner assigned, order is on the way",
        status: "OUT_FOR_DELIVERY",
        orderId: order._id,
      });
    } catch (socketError) {
      console.error("Socket notification error:", socketError.message);
    }

    res.status(200).json({
      success: true,
      message: "Delivery partner assigned successfully",
      order: updatedOrder,
    });

  } catch (error) {
    next(error);
  }
};
