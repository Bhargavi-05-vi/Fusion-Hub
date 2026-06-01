import MenuItem from "../models/MenuItem.js";


// Create menu 
export const createMenuItem = async (req, res, next) => {
  try {
    const { restaurant, name, description, price, image, category } =
      req.body;

    const item = await MenuItem.create({
      restaurant,
      name,
      description,
      price,
      image,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Menu item created",
      item,
    });

  } catch (error) {
    next(error);
  }
};


// Get menu by restaurant
export const getRestaurantMenu = async (req, res, next) => {
  try {
    const items = await MenuItem.find({
      restaurant: req.params.restaurantId,
    });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });

  } catch (error) {
    next(error);
  }
};


// Update menu item
export const updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.price = req.body.price || item.price;
    item.image = req.body.image || item.image;
    item.category = req.body.category || item.category;
    item.isAvailable =
      req.body.isAvailable !== undefined
        ? req.body.isAvailable
        : item.isAvailable;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Menu updated",
      item,
    });

  } catch (error) {
    next(error);
  }
};


// Delete menu item
export const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Menu item deleted",
    });

  } catch (error) {
    next(error);
  }
};
