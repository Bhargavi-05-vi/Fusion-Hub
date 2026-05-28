**Fusion Hub 🍔🚀**
A modern full-stack Food Delivery & Dine-Out Platform built using the MERN stack.
Fusion Hub combines food ordering, restaurant discovery, table reservations, live order tracking, reviews, and delivery management into one powerful platform.

**🌟 Features**

**👤 Authentication & Authorization**
JWT Authentication
Role-Based Access Control
Customer, Restaurant, Delivery & Admin Roles
Secure Password Hashing using bcrypt

**🍽 Restaurant Management**
Create & Manage Restaurants
Add/Edit/Delete Menu Items
Restaurant Details & Ratings
Geo-location Based Search

**🛒 Food Ordering System**
Place Orders
Real-Time Order Status Updates
Order History
Payment Method Handling

**📍 Nearby Restaurant Search**
MongoDB Geospatial Queries
Find Nearby Restaurants by Location
Distance-Based Filtering

**📦 Delivery Module**
Delivery Partner Dashboard
Accept/Deliver Orders
Live Delivery Tracking using Socket.io

**⭐ Review & Reward System**
Add Restaurant Reviews
Reward Points Calculation
Restaurant Rating Updates

**🪑 Table Reservation System**
Book Tables
Cancel Reservations
Restaurant Reservation Management

**📊 Admin Dashboard**
Total Users
Total Restaurants
Total Orders
Revenue Analytics

**⚡ Real-Time Features**
Socket.io Integration
Live Order Tracking
Delivery Status Notifications

**🛠 Tech Stack**
**Frontend**
React.js
Tailwind CSS
Axios
React Router DOM
Socket.io Client

**Backend**
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Socket.io
Tools
Git & GitHub
Postman
Nodemon

**📁 Project Structure**
FusionHub/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
⚙️ Environment Variables

Create a .env file inside the Backend folder.

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/FusionHub_db

JWT_SECRET=FusionHub@2026#SECRET

CLIENT_URL=http://localhost:5173
🚀 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Bhargavi-05-vi/Fusion-Hub.git
2️⃣ Backend Setup
cd Backend

npm install

Run Backend:

npm run dev

Backend Running On:

http://localhost:5000
3️⃣ Frontend Setup
cd Frontend

npm install

Run Frontend:

npm run dev

Frontend Running On:

http://localhost:5173
🔐 API Routes
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login User
GET	/api/auth/profile	Get Profile
Restaurants
Method	Endpoint	Description
GET	/api/restaurants	Get All Restaurants
POST	/api/restaurants	Create Restaurant
GET	/api/restaurants/nearby	Nearby Restaurants
GET	/api/restaurants/:id	Single Restaurant
Menu
Method	Endpoint	Description
POST	/api/menu	Create Menu Item
GET	/api/menu/:restaurantId	Get Restaurant Menu
Orders
Method	Endpoint	Description
POST	/api/orders	Create Order
GET	/api/orders/my-orders	Get My Orders
PATCH	/api/orders/:id/status	Update Order Status
Reservations
Method	Endpoint	Description
POST	/api/reservations	Create Reservation
GET	/api/reservations/my-reservations	My Reservations
Reviews
Method	Endpoint	Description
POST	/api/reviews	Add Review
GET	/api/reviews/:restaurantId	Get Reviews
