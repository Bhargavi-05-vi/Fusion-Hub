import Reservation from "../models/Reservation.js";
import Restaurant from "../models/Restaurant.js";

// Create reservation
export const createReservation = async (req, res, next) => {
  try {
    const { restaurantId, reservationDate, guests } = req.body;

    if (!restaurantId || !reservationDate || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const reservation = await Reservation.create({
      customer: req.user.id,
      restaurant: restaurantId,
      reservationDate,
      guests,
    });

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });

  } catch (error) {
    next(error);
  }
};

// Get my reservations
export const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      customer: req.user.id,
    }).populate("restaurant", "name address");

    res.status(200).json({
      success: true,
      count: reservations.length,
      reservations,
    });

  } catch (error) {
    next(error);
  }
};

// Cancel reservation
export const cancelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (reservation.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully",
      reservation,
    });

  } catch (error) {
    next(error);
  }
};

// Restaurant reservations
export const getRestaurantReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      restaurant: req.params.restaurantId,
    }).populate("customer", "name email phone");

    res.status(200).json({
      success: true,
      count: reservations.length,
      reservations,
    });

  } catch (error) {
    next(error);
  }
};