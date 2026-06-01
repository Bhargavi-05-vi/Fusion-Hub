import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";
import { getIO } from "../config/socket.js";


// Create 
export const createOrder = async (req, res, next) => {
  try {
    const {
      restaurantId,
      items,
      deliveryAddress,
      paymentMethod,
    } = req.body;

    if (!restaurantId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Restaurant and items required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem) continue;

      totalAmount += menuItem.price * item.quantity;

      orderItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

    const order = await Order.create({
      customer: req.user.id,
      restaurant: restaurantId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });

    const io = getIO();

    io.to(restaurant.owner.toString()).emit("new-order", {
      message: "New order received",
      order,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    next(error);
  }
};


// Get logged in user's orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    next(error);
  }
};


// Get single order
export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email")
      .populate("restaurant", "name")
      .populate("deliveryPartner", "name")
      .populate("items.menuItem", "name price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
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


// Update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    const io = getIO();

    io.to(order.customer.toString()).emit("order-status-updated", {
      message: "Order status updated",
      status,
      orderId: order._id,
    });

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    next(error);
  }
};


// Assign delivery partner
export const assignDeliveryPartner = async (req, res, next) => {
  try {
    const { deliveryPartnerId } = req.body;

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

    const io = getIO();

    io.to(deliveryPartnerId).emit("delivery-assigned", {
      message: "New delivery assigned",
      order,
    });

    io.to(order.customer.toString()).emit("order-status-updated", {
      message: "Delivery partner assigned",
      status: "OUT_FOR_DELIVERY",
    });

    res.status(200).json({
      success: true,
      message: "Delivery assigned successfully",
      order,
    });

  } catch (error) {
    next(error);
  }
};
