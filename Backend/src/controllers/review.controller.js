import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import calculateRewardPoints from "../utils/rewardCalculator.js";


// Add review
export const createReview = async (req, res, next) => {
  try {
    const {
      restaurantId,
      rating,
      reviewText,
    } = req.body;

    if (!restaurantId || !rating || !reviewText) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const rewardPoints = calculateRewardPoints(reviewText);

    const review = await Review.create({
      customer: req.user.id,
      restaurant: restaurantId,
      rating,
      reviewText,
      rewardPointsEarned: rewardPoints,
    });

    const user = await User.findById(req.user.id);

    user.rewardPoints += rewardPoints;

    await user.save();

    const allReviews = await Review.find({
      restaurant: restaurantId,
    });

    const avgRating =
      allReviews.reduce((sum, item) => sum + item.rating, 0) /
      allReviews.length;

    restaurant.rating = avgRating;
    restaurant.totalReviews = allReviews.length;

    await restaurant.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      rewardPoints,
      review,
    });

  } catch (error) {
    next(error);
  }
};


// Get restaurant reviews
export const getRestaurantReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      restaurant: req.params.restaurantId,
    }).populate("customer", "name avatar");

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    next(error);
  }
};
