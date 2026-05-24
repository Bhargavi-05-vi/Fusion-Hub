import Order from "../models/Order.js";
import { getIO } from "../config/socket.js";


// Get assigned delivery orders
export const getAssignedOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      deliveryPartner: req.user.id,
    })
      .populate("customer", "name phone")
      .populate("restaurant", "name address");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    next(error);
  }
};


// Accept delivery
export const acceptDelivery = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.deliveryPartner = req.user.id;
    order.status = "OUT_FOR_DELIVERY";

    await order.save();

    const io = getIO();

    io.to(order.customer.toString()).emit("order-status-updated", {
      status: "OUT_FOR_DELIVERY",
      orderId: order._id,
    });

    res.status(200).json({
      success: true,
      message: "Delivery accepted",
      order,
    });

  } catch (error) {
    next(error);
  }
};


// Mark delivered
export const markDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "DELIVERED";
    order.paymentStatus = "paid";

    await order.save();

    const io = getIO();

    io.to(order.customer.toString()).emit("order-status-updated", {
      status: "DELIVERED",
      orderId: order._id,
    });

    res.status(200).json({
      success: true,
      message: "Order delivered successfully",
      order,
    });

  } catch (error) {
    next(error);
  }
};


// Update live location
export const updateDeliveryLocation = async (req, res, next) => {
  try {
    const { customerId, latitude, longitude } = req.body;

    const io = getIO();

    io.to(customerId).emit("delivery-location-updated", {
      latitude,
      longitude,
    });

    res.status(200).json({
      success: true,
      message: "Location updated",
    });

  } catch (error) {
    next(error);
  }
};