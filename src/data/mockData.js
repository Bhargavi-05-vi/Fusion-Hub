export const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Kochi",
  "Surat",
  "Nagpur",
];

export const foodCategories = [
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burgers", icon: "🍔" },
  { id: 3, name: "Biryani", icon: "🍛" },
  { id: 4, name: "Chinese", icon: "🥡" },
  { id: 5, name: "South Indian", icon: "🥘" },
  { id: 6, name: "Desserts", icon: "🍰" },
  { id: 7, name: "Cafe", icon: "☕" },
  { id: 8, name: "Healthy", icon: "🥗" },
];

export const eventCategories = [
  "All",
  "Concert",
  "Comedy",
  "Food Festival",
  "Sports",
  "Workshop",
];

const restaurantImages = {
  "North Indian":
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
  "South Indian":
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800",
  Chinese:
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
  Italian:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  Biryani:
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800",
  Cafe:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
};

const menuImages = {
  "Butter Chicken":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
  "Paneer Butter Masala":
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
  "Chicken Biryani":
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500",
  "Masala Dosa":
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500",
  Burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  "French Fries":
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
  "Margherita Pizza":
    "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500",
  Cheesecake:
    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
};

const restaurantTemplates = [
  {
    type: "North Indian",
    name: "Spice House",
    menu: [
      "Butter Chicken",
      "Paneer Butter Masala",
      "Dal Makhani",
      "Chicken Tikka",
      "Tandoori Roti",
      "Garlic Naan",
      "Veg Biryani",
      "Gulab Jamun",
    ],
  },
  {
    type: "South Indian",
    name: "Dosa Junction",
    menu: [
      "Masala Dosa",
      "Plain Dosa",
      "Idli",
      "Medu Vada",
      "Uttapam",
      "Sambar Rice",
      "Curd Rice",
      "Filter Coffee",
    ],
  },
  {
    type: "Chinese",
    name: "Dragon Wok",
    menu: [
      "Veg Noodles",
      "Hakka Noodles",
      "Fried Rice",
      "Spring Roll",
      "Manchurian",
      "Chilli Paneer",
      "Chicken Noodles",
      "Hot & Sour Soup",
    ],
  },
  {
    type: "Italian",
    name: "Pizza Republic",
    menu: [
      "Margherita Pizza",
      "Farmhouse Pizza",
      "Pepperoni Pizza",
      "White Sauce Pasta",
      "Red Sauce Pasta",
      "Garlic Bread",
      "Lasagna",
      "Tiramisu",
    ],
  },
  {
    type: "Biryani",
    name: "Royal Biryani",
    menu: [
      "Chicken Biryani",
      "Mutton Biryani",
      "Veg Biryani",
      "Egg Biryani",
      "Chicken 65",
      "Seekh Kebab",
      "Raita",
      "Double Ka Meetha",
    ],
  },
  {
    type: "Cafe",
    name: "Cafe Mocha",
    menu: [
      "Cappuccino",
      "Latte",
      "Cold Coffee",
      "Cheesecake",
      "Brownie",
      "Veg Sandwich",
      "Burger",
      "French Fries",
    ],
  },
];

let restaurantId = 1;
let menuId = 1;

export const restaurants = [];

cities.forEach((city) => {
  restaurantTemplates.forEach((template) => {
    restaurants.push({
      id: restaurantId++,
      name: `${city} ${template.name}`,
      location: city,
      cuisine: template.type,
      rating: Number((4 + Math.random()).toFixed(1)),
      deliveryTime: `${20 + Math.floor(Math.random() * 20)} min`,
      image:
        restaurantImages[template.type] ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",

      menu: template.menu.map((item) => ({
        id: menuId++,
        name: item,
        category: template.type,
        price: 99 + Math.floor(Math.random() * 400),

        image:
          menuImages[item] ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
      })),
    });
  });
});

export const menuItems = restaurants.reduce((acc, restaurant) => {
  acc[restaurant.id] = restaurant.menu;
  return acc;
}, {});

export const events = [
  {
    id: "1",
    name: "Delhi Food Festival",
    category: "Food Festival",
    venue: "Pragati Maidan",
    date: "15 June 2026",
    price: 999,
    originalPrice: 1499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    tags: ["Food", "Live Music", "Family"],
  },
  {
    id: "2",
    name: "Mumbai Comedy Night",
    category: "Comedy",
    venue: "NCPA Mumbai",
    date: "20 June 2026",
    price: 799,
    originalPrice: 1199,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=1200",
    tags: ["Standup", "Comedy"],
  },
  {
    id: "3",
    name: "Bangalore Rock Concert",
    category: "Concert",
    venue: "Bangalore Arena",
    date: "28 June 2026",
    price: 1999,
    originalPrice: 2499,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200",
    tags: ["Music", "Rock"],
  },
];

export const dineOutRestaurants = [
  {
    id: 1,
    name: "The Grand Dining",
    location: "Delhi",
    cuisine: "North Indian",
    rating: 4.8,
    image: restaurantImages["North Indian"],
    priceForTwo: 1800,
    offer: "20% OFF",
  },
  {
    id: 2,
    name: "Sky Lounge",
    location: "Mumbai",
    cuisine: "Italian",
    rating: 4.7,
    image: restaurantImages["Italian"],
    priceForTwo: 2200,
    offer: "Free Dessert",
  },
  {
    id: 3,
    name: "Royal Feast",
    location: "Hyderabad",
    cuisine: "Biryani",
    rating: 4.9,
    image: restaurantImages["Biryani"],
    priceForTwo: 1700,
    offer: "25% OFF",
  },
];
