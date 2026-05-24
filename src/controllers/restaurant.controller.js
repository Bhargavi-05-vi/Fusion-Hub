import Restaurant from "../models/Restaurant.js";


// Create restaurant
export const createRestaurant = async (req, res, next) => {
  try {
    const {
      name,
      description,
      image,
      cuisine,
      address,
      latitude,
      longitude,
      deliveryTime,
      deliveryFee,
    } = req.body;

    const restaurant = await Restaurant.create({
      owner: req.user.id,
      name,
      description,
      image,
      cuisine,
      address,
      deliveryTime,
      deliveryFee,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });

  } catch (error) {
    next(error);
  }
};


// Get all restaurants
export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().populate(
      "owner",
      "name email"
    );

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });

  } catch (error) {
    next(error);
  }
};


// Get single restaurant
export const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });

  } catch (error) {
    next(error);
  }
};


// Update restaurant
export const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    restaurant.name = req.body.name || restaurant.name;
    restaurant.description = req.body.description || restaurant.description;
    restaurant.image = req.body.image || restaurant.image;
    restaurant.cuisine = req.body.cuisine || restaurant.cuisine;
    restaurant.address = req.body.address || restaurant.address;
    restaurant.deliveryTime =
      req.body.deliveryTime || restaurant.deliveryTime;
    restaurant.deliveryFee =
      req.body.deliveryFee || restaurant.deliveryFee;

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });

  } catch (error) {
    next(error);
  }
};


// Delete restaurant
export const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};


// Nearby geo search
export const getNearbyRestaurants = async (req, res, next) => {
  try {
    const { lat, lng, distance = 5000 } = req.query;

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(distance),
        },
      },
    });

    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants,
    });

  } catch (error) {
    next(error);
  }
};