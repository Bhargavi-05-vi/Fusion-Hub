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
    id: 'e1',
    name: "Sunburn Festival 2025",
    category: "Music",
    date: "Dec 28-30, 2025",
    venue: "HICC, Hyderabad",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    price: 2499,
    originalPrice: 3000,
    tags: ["EDM", "Festival", "3 Days"],
    rating: 4.8
  },
  {
    id: 'e2',
    name: "Comedy Carnival Night",
    category: "Comedy",
    date: "Nov 15, 2025",
    venue: "Shilpakala Vedika",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&q=80",
    price: 799,
    originalPrice: 999,
    tags: ["Stand-up", "Live"],
    rating: 4.6
  },
  {
    id: 'e3',
    name: "AR Rahman Live Concert",
    category: "Music",
    date: "Dec 5, 2025",
    venue: "LB Stadium, Hyderabad",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    price: 1499,
    originalPrice: 1999,
    tags: ["Bollywood", "Live Music"],
    rating: 4.9
  },
  {
    id: 'e4',
    name: "Food & Wine Festival",
    category: "Food",
    date: "Nov 22-24, 2025",
    venue: "Novotel HICC",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    price: 599,
    originalPrice: 799,
    tags: ["Gourmet", "Tasting"],
    rating: 4.5
  },
  {
    id: 'e5',
    name: "Tech Summit 2025",
    category: "Tech",
    date: "Jan 10-12, 2026",
    venue: "HITEX Exhibition Centre",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    price: 999,
    originalPrice: 1499,
    tags: ["AI", "Startups"],
    rating: 4.7
  },
  {
    id: 'e6',
    name: "Vintage Art Expo",
    category: "Art",
    date: "Nov 30, 2025",
    venue: "Salar Jung Museum",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80",
    price: 299,
    originalPrice: 499,
    tags: ["Art", "Culture"],
    rating: 4.4
  },
  {
    id: 'e7',
    name: "IPL Fan Fest 2026",
    category: "Sports",
    date: "Feb 15, 2026",
    venue: "Rajiv Gandhi Stadium",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
    price: 899,
    originalPrice: 1299,
    tags: ["Cricket", "Fan Meet"],
    rating: 4.8
  },
  {
    id: 'e8',
    name: "Startup Connect 2026",
    category: "Tech",
    date: "Mar 20, 2026",
    venue: "T-Hub Hyderabad",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80",
    price: 1199,
    originalPrice: 1599,
    tags: ["Networking", "AI"],
    rating: 4.7
  },
  {
    id: 'e9',
    name: "Hyderabad Theatre Festival",
    category: "Theatre",
    date: "Jan 25, 2026",
    venue: "Ravindra Bharathi",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80",
    price: 499,
    originalPrice: 699,
    tags: ["Drama", "Live Show"],
    rating: 4.5
  },
  {
    id: 'e10',
    name: "Gaming Championship 2026",
    category: "Tech",
    date: "Apr 12, 2026",
    venue: "HITEX Arena",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
    price: 699,
    originalPrice: 999,
    tags: ["Gaming", "Tournament"],
    rating: 4.9
  },
  {
    id: 'e11',
    name: "International Food Carnival",
    category: "Food",
    date: "May 18, 2026",
    venue: "Necklace Road",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    price: 399,
    originalPrice: 599,
    tags: ["Food", "Festival"],
    rating: 4.6
  },
  {
    id: 'e12',
    name: "Arijit Singh Live",
    category: "Music",
    date: "June 08, 2026",
    venue: "Gachibowli Stadium",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80",
    price: 1999,
    originalPrice: 2499,
    tags: ["Concert", "Bollywood"],
    rating: 5.0
  },
  {
    id: 'e13',
    name: "Standup Night with Zakir Khan",
    category: "Comedy",
    date: "July 02, 2026",
    venue: "Shilpakala Vedika",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&q=80",
    price: 999,
    originalPrice: 1299,
    tags: ["Standup", "Comedy"],
    rating: 4.9
  },
  {
    id: 'e14',
    name: "Anime & Cosplay Expo",
    category: "Tech",
    date: "Aug 15, 2026",
    venue: "HICC Hyderabad",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    price: 799,
    originalPrice: 1099,
    tags: ["Anime", "Cosplay"],
    rating: 4.8
  },
  {
    id: 'e15',
    name: "Rock Music Festival",
    category: "Music",
    date: "Sep 10, 2026",
    venue: "LB Stadium",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&q=80",
    price: 1499,
    originalPrice: 1999,
    tags: ["Rock", "Live Band"],
    rating: 4.7
  }
];

export const dineOutRestaurants = [
  { id: 'd1', name: "The Grand Brasserie", cuisine: "Continental, French", rating: 4.8, priceForTwo: 2500, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", tags: ["Fine Dining", "Romantic"], ambiance: "Elegant", location: "Jubilee Hills", availableSlots: ["7:00 PM", "7:30 PM", "8:00 PM", "9:00 PM"] },
  { id: 'd2', name: "Sakura Japanese", cuisine: "Japanese, Sushi Bar", rating: 4.7, priceForTwo: 3000, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", tags: ["Premium", "Date Night"], ambiance: "Zen", location: "Banjara Hills", availableSlots: ["6:30 PM", "7:00 PM", "8:30 PM", "9:30 PM"] },
  { id: 'd3', name: "Rooftop Garden", cuisine: "Mediterranean, Tapas", rating: 4.6, priceForTwo: 1800, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", tags: ["Rooftop", "Views"], ambiance: "Alfresco", location: "Hitech City", availableSlots: ["7:00 PM", "7:30 PM", "8:00 PM"] },
  { id: 'd4', name: "Coal & Barrel", cuisine: "BBQ, American Grill", rating: 4.5, priceForTwo: 1600, image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80", tags: ["Live Music", "Grill"], ambiance: "Industrial", location: "Madhapur", availableSlots: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"] },
  { id: 'd5', name: "Spice Route", cuisine: "Pan-Asian, Fusion", rating: 4.4, priceForTwo: 2200, image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80", tags: ["Fusion", "Award Winning"], ambiance: "Exotic", location: "Gachibowli", availableSlots: ["7:00 PM", "7:30 PM", "9:00 PM"] },
  { id: 'd6', name: "Casa Italiana", cuisine: "Authentic Italian", rating: 4.6, priceForTwo: 2800, image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80", tags: ["Romantic", "Fine Dining"], ambiance: "Rustic", location: "Film Nagar", availableSlots: ["7:00 PM", "8:00 PM", "8:30 PM", "9:30 PM"] },
  {
  id: 'd7',
  name: "Skyline Rooftop Lounge",
  cuisine: "Continental, Barbecue",
  rating: 4.8,
  priceForTwo: 2200,
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  tags: ["Rooftop", "Live Music"],
  ambiance: "Luxury",
  location: "Financial District",
  availableSlots: ["7:00 PM", "8:00 PM", "9:00 PM"]
},
{
  id: 'd8',
  name: "Punjab Grill House",
  cuisine: "North Indian, Mughlai",
  rating: 4.7,
  priceForTwo: 1800,
  image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
  tags: ["Family Dining", "Popular"],
  ambiance: "Traditional",
  location: "Banjara Hills",
  availableSlots: ["6:30 PM", "7:30 PM", "8:30 PM"]
},
{
  id: 'd9',
  name: "Ocean Pearl Seafood",
  cuisine: "Seafood, Coastal",
  rating: 4.6,
  priceForTwo: 2500,
  image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
  tags: ["Seafood", "Premium"],
  ambiance: "Modern",
  location: "Jubilee Hills",
  availableSlots: ["7:00 PM", "8:00 PM", "9:30 PM"]
},
{
  id: 'd10',
  name: "Royal Biryani Palace",
  cuisine: "Hyderabadi, Biryani",
  rating: 4.9,
  priceForTwo: 1400,
  image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  tags: ["Biryani", "Best Seller"],
  ambiance: "Royal",
  location: "Madhapur",
  availableSlots: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"]
},
{
  id: 'd11',
  name: "Bella Italia",
  cuisine: "Italian, Pizza",
  rating: 4.7,
  priceForTwo: 2100,
  image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
  tags: ["Italian", "Romantic"],
  ambiance: "European",
  location: "Gachibowli",
  availableSlots: ["7:00 PM", "8:30 PM", "9:30 PM"]
},
{
  id: 'd12',
  name: "Asian Wok Express",
  cuisine: "Chinese, Thai",
  rating: 4.5,
  priceForTwo: 1700,
  image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80",
  tags: ["Asian", "Fusion"],
  ambiance: "Contemporary",
  location: "Hitech City",
  availableSlots: ["6:30 PM", "7:30 PM", "8:30 PM"]
},
{
  id: 'd13',
  name: "The Green Leaf",
  cuisine: "Vegetarian, Healthy",
  rating: 4.6,
  priceForTwo: 1300,
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  tags: ["Healthy", "Pure Veg"],
  ambiance: "Nature Inspired",
  location: "Kondapur",
  availableSlots: ["7:00 PM", "8:00 PM"]
},
{
  id: 'd14',
  name: "Steak & Smoke",
  cuisine: "American, Grill",
  rating: 4.8,
  priceForTwo: 2800,
  image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
  tags: ["BBQ", "Premium"],
  ambiance: "Industrial",
  location: "Jubilee Hills",
  availableSlots: ["7:00 PM", "8:00 PM", "9:00 PM"]
},
{
  id: 'd15',
  name: "Cafe Mocha",
  cuisine: "Cafe, Desserts",
  rating: 4.5,
  priceForTwo: 1000,
  image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80",
  tags: ["Coffee", "Desserts"],
  ambiance: "Cozy",
  location: "Madhapur",
  availableSlots: ["5:00 PM", "6:00 PM", "7:00 PM"]
},
{
  id: 'd16',
  name: "The Royal Feast",
  cuisine: "North Indian, Awadhi",
  rating: 4.8,
  priceForTwo: 2600,
  image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
  tags: ["Luxury", "Family Dining"],
  ambiance: "Royal",
  location: "Banjara Hills",
  availableSlots: ["7:00 PM", "8:00 PM", "9:00 PM"]
},
{
  id: 'd17',
  name: "Ocean Breeze Cafe",
  cuisine: "Seafood, Continental",
  rating: 4.7,
  priceForTwo: 2300,
  image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
  tags: ["Sea View", "Premium"],
  ambiance: "Modern",
  location: "Gachibowli",
  availableSlots: ["6:30 PM", "7:30 PM", "8:30 PM"]
},
{
  id: 'd18',
  name: "Arabian Nights",
  cuisine: "Middle Eastern, Lebanese",
  rating: 4.6,
  priceForTwo: 1900,
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  tags: ["Shawarma", "Family"],
  ambiance: "Arabic",
  location: "Madhapur",
  availableSlots: ["7:00 PM", "8:00 PM", "9:00 PM"]
},
{
  id: 'd19',
  name: "Tandoor Express",
  cuisine: "Indian, BBQ",
  rating: 4.5,
  priceForTwo: 1500,
  image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
  tags: ["BBQ", "Live Kitchen"],
  ambiance: "Casual",
  location: "Kondapur",
  availableSlots: ["6:00 PM", "7:00 PM", "8:00 PM"]
},
{
  id: 'd20',
  name: "Sky High Dining",
  cuisine: "Multi Cuisine",
  rating: 4.9,
  priceForTwo: 3200,
  image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  tags: ["Rooftop", "Fine Dining"],
  ambiance: "Luxury",
  location: "Financial District",
  availableSlots: ["7:00 PM", "8:00 PM", "9:30 PM"]
}
];
