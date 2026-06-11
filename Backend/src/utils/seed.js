/**
 * FusionHub Database Seeder — Fixed Version
 * ──────────────────────────────────────────
 * HOW TO RUN (from the Backend folder):
 *   node src/utils/seed.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";
import User from "../models/User.js";

dotenv.config();

// ── Restaurant templates ───────────────────────────────────────
const restaurantTemplates = [
  {
    type: "North Indian",
    name: "Spice House",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
    menu: [
      { name: "Butter Chicken",       price: 320, category: "Main Course" },
      { name: "Paneer Butter Masala", price: 280, category: "Main Course" },
      { name: "Dal Makhani",          price: 220, category: "Main Course" },
      { name: "Chicken Tikka",        price: 350, category: "Starters" },
      { name: "Tandoori Roti",        price: 40,  category: "Breads" },
      { name: "Garlic Naan",          price: 60,  category: "Breads" },
      { name: "Veg Biryani",          price: 250, category: "Rice" },
      { name: "Gulab Jamun",          price: 120, category: "Desserts" },
    ],
  },
  {
    type: "South Indian",
    name: "Dosa Junction",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",
    menu: [
      { name: "Masala Dosa",   price: 120, category: "Dosas" },
      { name: "Plain Dosa",    price: 80,  category: "Dosas" },
      { name: "Idli",          price: 80,  category: "Starters" },
      { name: "Medu Vada",     price: 90,  category: "Starters" },
      { name: "Uttapam",       price: 130, category: "Main Course" },
      { name: "Sambar Rice",   price: 150, category: "Rice" },
      { name: "Curd Rice",     price: 120, category: "Rice" },
      { name: "Filter Coffee", price: 60,  category: "Beverages" },
    ],
  },
  {
    type: "Chinese",
    name: "Dragon Wok",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
    menu: [
      { name: "Veg Noodles",      price: 160, category: "Noodles" },
      { name: "Hakka Noodles",    price: 180, category: "Noodles" },
      { name: "Fried Rice",       price: 170, category: "Rice" },
      { name: "Spring Roll",      price: 140, category: "Starters" },
      { name: "Manchurian",       price: 200, category: "Starters" },
      { name: "Chilli Paneer",    price: 220, category: "Starters" },
      { name: "Chicken Noodles",  price: 220, category: "Noodles" },
      { name: "Hot & Sour Soup",  price: 120, category: "Soups" },
    ],
  },
  {
    type: "Italian",
    name: "Pizza Republic",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    menu: [
      { name: "Margherita Pizza",  price: 299, category: "Pizza" },
      { name: "Farmhouse Pizza",   price: 349, category: "Pizza" },
      { name: "Pepperoni Pizza",   price: 399, category: "Pizza" },
      { name: "White Sauce Pasta", price: 249, category: "Pasta" },
      { name: "Red Sauce Pasta",   price: 229, category: "Pasta" },
      { name: "Garlic Bread",      price: 129, category: "Sides" },
      { name: "Lasagna",           price: 349, category: "Main Course" },
      { name: "Tiramisu",          price: 199, category: "Desserts" },
    ],
  },
  {
    type: "Biryani",
    name: "Royal Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800",
    menu: [
      { name: "Chicken Biryani",   price: 299, category: "Biryani" },
      { name: "Mutton Biryani",    price: 399, category: "Biryani" },
      { name: "Veg Biryani",       price: 229, category: "Biryani" },
      { name: "Egg Biryani",       price: 249, category: "Biryani" },
      { name: "Chicken 65",        price: 280, category: "Starters" },
      { name: "Seekh Kebab",       price: 320, category: "Starters" },
      { name: "Raita",             price: 60,  category: "Sides" },
      { name: "Double Ka Meetha",  price: 120, category: "Desserts" },
    ],
  },
  {
    type: "Cafe",
    name: "Cafe Mocha",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    menu: [
      { name: "Cappuccino",    price: 160, category: "Beverages" },
      { name: "Latte",         price: 180, category: "Beverages" },
      { name: "Cold Coffee",   price: 199, category: "Beverages" },
      { name: "Cheesecake",    price: 249, category: "Desserts" },
      { name: "Brownie",       price: 179, category: "Desserts" },
      { name: "Veg Sandwich",  price: 149, category: "Snacks" },
      { name: "Burger",        price: 199, category: "Snacks" },
      { name: "French Fries",  price: 129, category: "Snacks" },
    ],
  },
];

// ── Cities + coordinates ──────────────────────────────────────
const cities = [
  { name: "Delhi",      coords: [77.2090, 28.6139] },
  { name: "Mumbai",     coords: [72.8777, 19.0760] },
  { name: "Bangalore",  coords: [77.5946, 12.9716] },
  { name: "Hyderabad",  coords: [78.4867, 17.3850] },
  { name: "Chennai",    coords: [80.2707, 13.0827] },
  { name: "Kolkata",    coords: [88.3639, 22.5726] },
  { name: "Pune",       coords: [73.8567, 18.5204] },
  { name: "Jaipur",     coords: [75.7873, 26.9124] },
  { name: "Lucknow",    coords: [80.9462, 26.8467] },
  { name: "Chandigarh", coords: [76.7794, 30.7333] },
];

// ── Menu item images ──────────────────────────────────────────
const menuImages = {
  "Butter Chicken":       "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
  "Paneer Butter Masala": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
  "Chicken Biryani":      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500",
  "Masala Dosa":          "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500",
  "Burger":               "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  "French Fries":         "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
  "Margherita Pizza":     "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500",
  "Cheesecake":           "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
};
const defaultMenuImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";

// ── Helper ────────────────────────────────────────────────────
const randomOffset = () => (Math.random() - 0.5) * 0.1;

// ── Main ──────────────────────────────────────────────────────
const seed = async () => {
  try {
    console.log("🔌 Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected!\n");

    // 1. Find or create admin user
    let owner = await User.findOne({ role: "admin" });
    if (!owner) {
      owner = await User.create({
        name: "FusionHub Admin",
        email: "admin@fusionhub.com",
        password: "Admin@1234",
        role: "admin",
        phone: "9000000000",
      });
      console.log("✅ Admin user created: admin@fusionhub.com / Admin@1234");
    } else {
      console.log(`✅ Using existing admin: ${owner.email}`);
    }

    // 2. Clear old data
    console.log("\n🗑️  Clearing old restaurants and menu items...");
    await MenuItem.deleteMany({});
    await Restaurant.deleteMany({});
    console.log("✅ Cleared\n");

    // 3. Seed city by city, restaurant by restaurant
    let totalRestaurants = 0;
    let totalMenuItems = 0;

    for (const city of cities) {
      console.log(`📍 Seeding ${city.name}...`);

      for (const template of restaurantTemplates) {
        const lng = city.coords[0] + randomOffset();
        const lat = city.coords[1] + randomOffset();

        // Insert restaurant using save() instead of create()
        // to avoid issues with the 2dsphere index during bulk insert
        const restaurant = new Restaurant({
          owner: owner._id,
          name: `${city.name} ${template.name}`,
          description: `Authentic ${template.type} cuisine in the heart of ${city.name}`,
          cuisine: [template.type],
          address: `${city.name}, India`,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
          image: template.image,
          rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
          deliveryTime: 20 + Math.floor(Math.random() * 20),
          deliveryFee: 49,
          isOpen: true,
        });

        await restaurant.save();
        totalRestaurants++;

        // Insert menu items for this restaurant
        const menuDocs = template.menu.map((item) => ({
          restaurant: restaurant._id,
          name: item.name,
          description: `Freshly prepared ${item.name} made with the finest ingredients`,
          price: item.price,
          category: item.category,
          image: menuImages[item.name] || defaultMenuImage,
          isAvailable: true,
        }));

        await MenuItem.insertMany(menuDocs);
        totalMenuItems += menuDocs.length;
      }

      console.log(`   ✅ ${restaurantTemplates.length} restaurants added for ${city.name}`);
    }

    console.log("\n🎉 Seeding complete!");
    console.log(`   🏪 Restaurants : ${totalRestaurants}`);
    console.log(`   🍽️  Menu items  : ${totalMenuItems}`);
    console.log("\n👉 Open MongoDB Atlas to verify the data.");

  } catch (err) {
    console.error("\n❌ Seeding failed:", err.message);
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB.");
    process.exit(0);
  }
};

seed();
