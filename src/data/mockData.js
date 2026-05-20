export const restaurants = [
  { id: 1, name: "Spice Garden", cuisine: "North Indian, Mughlai", rating: 4.5, deliveryTime: "25-35 min", minOrder: 199, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", tags: ["Bestseller", "Pure Veg"], discount: "40% OFF", distance: "1.2 km", priceForTwo: 600 },
  { id: 2, name: "Dragon Palace", cuisine: "Chinese, Thai, Asian", rating: 4.3, deliveryTime: "30-40 min", minOrder: 249, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80", tags: ["Trending"], discount: "20% OFF", distance: "2.1 km", priceForTwo: 700 },
  { id: 3, name: "Pizza Republic", cuisine: "Italian, Pizza, Pasta", rating: 4.6, deliveryTime: "20-30 min", minOrder: 299, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", tags: ["Top Rated"], discount: "30% OFF", distance: "0.8 km", priceForTwo: 800 },
  { id: 4, name: "Burger Barn", cuisine: "American, Burgers, Fast Food", rating: 4.2, deliveryTime: "15-25 min", minOrder: 149, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", tags: ["Fast Delivery"], discount: "15% OFF", distance: "1.5 km", priceForTwo: 500 },
  { id: 5, name: "Sushi Zen", cuisine: "Japanese, Sushi, Ramen", rating: 4.7, deliveryTime: "35-45 min", minOrder: 399, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80", tags: ["Premium"], discount: "10% OFF", distance: "3.2 km", priceForTwo: 1200 },
  { id: 6, name: "Taco Fiesta", cuisine: "Mexican, Tex-Mex", rating: 4.4, deliveryTime: "20-30 min", minOrder: 199, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80", tags: ["New"], discount: "25% OFF", distance: "1.8 km", priceForTwo: 650 },
];

export const menuItems = {
  1: [
    { id: 101, name: "Butter Chicken", desc: "Creamy tomato-based chicken curry", price: 320, isVeg: false, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80", category: "Main Course", isBestseller: true },
    { id: 102, name: "Dal Makhani", desc: "Slow-cooked black lentils in butter", price: 220, isVeg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", category: "Main Course", isBestseller: false },
    { id: 103, name: "Paneer Tikka", desc: "Grilled cottage cheese with spices", price: 280, isVeg: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", category: "Starters", isBestseller: true },
    { id: 104, name: "Garlic Naan", desc: "Soft bread with garlic and butter", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", category: "Breads", isBestseller: false },
    { id: 105, name: "Chicken Biryani", desc: "Aromatic basmati rice with tender chicken", price: 380, isVeg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", category: "Rice & Biryani", isBestseller: true },
    { id: 106, name: "Mango Lassi", desc: "Chilled yogurt drink with mango", price: 80, isVeg: true, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&q=80", category: "Beverages", isBestseller: false },
  ],
  2: [
    { id: 201, name: "Kung Pao Chicken", desc: "Spicy stir-fried chicken with peanuts", price: 340, isVeg: false, image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80", category: "Main Course", isBestseller: true },
    { id: 202, name: "Spring Rolls", desc: "Crispy vegetable filled rolls", price: 160, isVeg: true, image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&q=80", category: "Starters", isBestseller: false },
    { id: 203, name: "Pad Thai", desc: "Stir-fried rice noodles Thai style", price: 320, isVeg: false, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80", category: "Noodles", isBestseller: true },
    { id: 204, name: "Fried Rice", desc: "Wok-tossed rice with vegetables", price: 240, isVeg: true, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", category: "Rice", isBestseller: false },
  ],
  3: [
    { id: 301, name: "Margherita Pizza", desc: "Classic tomato, mozzarella, basil", price: 349, isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", category: "Pizza", isBestseller: false },
    { id: 302, name: "Pepperoni Pizza", desc: "Loaded with spicy pepperoni", price: 449, isVeg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80", category: "Pizza", isBestseller: true },
    { id: 303, name: "Pasta Carbonara", desc: "Creamy egg and bacon pasta", price: 320, isVeg: false, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80", category: "Pasta", isBestseller: true },
    { id: 304, name: "Garlic Bread", desc: "Toasted bread with garlic butter", price: 120, isVeg: true, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&q=80", category: "Sides", isBestseller: false },
  ],
  4: [
    { id: 401, name: "Classic Burger", desc: "Juicy beef patty with all the fixings", price: 249, isVeg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "Burgers", isBestseller: true },
    { id: 402, name: "Veggie Burger", desc: "Crispy plant-based patty", price: 199, isVeg: true, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80", category: "Burgers", isBestseller: false },
    { id: 403, name: "Loaded Fries", desc: "Fries with cheese sauce and jalapeños", price: 149, isVeg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", category: "Sides", isBestseller: true },
    { id: 404, name: "Chocolate Shake", desc: "Thick creamy chocolate milkshake", price: 129, isVeg: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80", category: "Beverages", isBestseller: false },
  ],
  5: [
    { id: 501, name: "Salmon Sushi (8 pcs)", desc: "Fresh Atlantic salmon nigiri", price: 680, isVeg: false, image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80", category: "Sushi", isBestseller: true },
    { id: 502, name: "Dragon Roll", desc: "Shrimp tempura with avocado topping", price: 580, isVeg: false, image: "https://images.unsplash.com/photo-1617196034106-b08df1fd0c09?w=400&q=80", category: "Rolls", isBestseller: true },
    { id: 503, name: "Veggie Ramen", desc: "Rich miso broth with tofu", price: 420, isVeg: true, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", category: "Ramen", isBestseller: false },
    { id: 504, name: "Edamame", desc: "Steamed soybeans with sea salt", price: 180, isVeg: true, image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=400&q=80", category: "Starters", isBestseller: false },
  ],
  6: [
    { id: 601, name: "Street Tacos (3 pcs)", desc: "Corn tortillas with carne asada", price: 280, isVeg: false, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80", category: "Tacos", isBestseller: true },
    { id: 602, name: "Veggie Burrito", desc: "Stuffed with beans, rice and cheese", price: 249, isVeg: true, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", category: "Burritos", isBestseller: false },
    { id: 603, name: "Nachos Supreme", desc: "Loaded nachos with all toppings", price: 220, isVeg: true, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80", category: "Starters", isBestseller: true },
  ],
};

export const dineOutRestaurants = [
  { id: 'd1', name: "The Grand Brasserie", cuisine: "Continental, French", rating: 4.8, priceForTwo: 2500, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", tags: ["Fine Dining", "Romantic"], ambiance: "Elegant", location: "Jubilee Hills", availableSlots: ["7:00 PM", "7:30 PM", "8:00 PM", "9:00 PM"] },
  { id: 'd2', name: "Sakura Japanese", cuisine: "Japanese, Sushi Bar", rating: 4.7, priceForTwo: 3000, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", tags: ["Premium", "Date Night"], ambiance: "Zen", location: "Banjara Hills", availableSlots: ["6:30 PM", "7:00 PM", "8:30 PM", "9:30 PM"] },
  { id: 'd3', name: "Rooftop Garden", cuisine: "Mediterranean, Tapas", rating: 4.6, priceForTwo: 1800, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", tags: ["Rooftop", "Views"], ambiance: "Alfresco", location: "Hitech City", availableSlots: ["7:00 PM", "7:30 PM", "8:00 PM"] },
  { id: 'd4', name: "Coal & Barrel", cuisine: "BBQ, American Grill", rating: 4.5, priceForTwo: 1600, image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80", tags: ["Live Music", "Grill"], ambiance: "Industrial", location: "Madhapur", availableSlots: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"] },
  { id: 'd5', name: "Spice Route", cuisine: "Pan-Asian, Fusion", rating: 4.4, priceForTwo: 2200, image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80", tags: ["Fusion", "Award Winning"], ambiance: "Exotic", location: "Gachibowli", availableSlots: ["7:00 PM", "7:30 PM", "9:00 PM"] },
  { id: 'd6', name: "Casa Italiana", cuisine: "Authentic Italian", rating: 4.6, priceForTwo: 2800, image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80", tags: ["Romantic", "Fine Dining"], ambiance: "Rustic", location: "Film Nagar", availableSlots: ["7:00 PM", "8:00 PM", "8:30 PM", "9:30 PM"] },
];

export const events = [
  { id: 'e1', name: "Sunburn Festival 2025", category: "Music", date: "Dec 28-30, 2025", venue: "HICC, Hyderabad", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80", price: 2499, originalPrice: 3000, tags: ["EDM", "Festival", "3 Days"], rating: 4.8 },
  { id: 'e2', name: "Comedy Carnival Night", category: "Comedy", date: "Nov 15, 2025", venue: "Shilpakala Vedika", image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&q=80", price: 799, originalPrice: 999, tags: ["Stand-up", "Live"], rating: 4.6 },
  { id: 'e3', name: "AR Rahman Live Concert", category: "Music", date: "Dec 5, 2025", venue: "LB Stadium, Hyderabad", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80", price: 1499, originalPrice: 1999, tags: ["Bollywood", "Live Music"], rating: 4.9 },
  { id: 'e4', name: "Food & Wine Festival", category: "Food", date: "Nov 22-24, 2025", venue: "Novotel HICC", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", price: 599, originalPrice: 799, tags: ["Gourmet", "Tasting"], rating: 4.5 },
  { id: 'e5', name: "Tech Summit 2025", category: "Tech", date: "Jan 10-12, 2026", venue: "HITEX Exhibition Centre", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", price: 999, originalPrice: 1499, tags: ["AI", "Startups"], rating: 4.7 },
  { id: 'e6', name: "Vintage Art Expo", category: "Art", date: "Nov 30, 2025", venue: "Salar Jung Museum", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80", price: 299, originalPrice: 499, tags: ["Art", "Culture"], rating: 4.4 },
];

export const foodCategories = [
  { id: 1, name: "Pizza", icon: "🍕", color: "#FF6B35" },
  { id: 2, name: "Burgers", icon: "🍔", color: "#E63946" },
  { id: 3, name: "Biryani", icon: "🍛", color: "#F4A261" },
  { id: 4, name: "Sushi", icon: "🍱", color: "#2A9D8F" },
  { id: 5, name: "Desserts", icon: "🍰", color: "#E76F51" },
  { id: 6, name: "Chinese", icon: "🥡", color: "#E63946" },
  { id: 7, name: "South Indian", icon: "🥘", color: "#F4A261" },
  { id: 8, name: "Healthy", icon: "🥗", color: "#57CC99" },
];

export const eventCategories = ["All", "Music", "Comedy", "Food", "Tech", "Art", "Sports", "Theatre"];

export const testimonials = [
  { id: 1, name: "Priya Sharma", role: "Food Lover", text: "FusionHub has completely changed how I experience dining and events. Everything in one place — absolutely brilliant!", avatar: "https://i.pravatar.cc/60?img=47", rating: 5 },
  { id: 2, name: "Rahul Mehta", role: "Event Enthusiast", text: "Booking concert tickets while ordering food for the pre-party? Only on FusionHub. 10/10 experience every single time.", avatar: "https://i.pravatar.cc/60?img=68", rating: 5 },
  { id: 3, name: "Ananya Rao", role: "Restaurant Owner", text: "As a restaurant partner, the analytics dashboard is outstanding. My revenue has grown 40% since joining FusionHub.", avatar: "https://i.pravatar.cc/60?img=32", rating: 5 },
];
