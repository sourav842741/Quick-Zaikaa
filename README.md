# 🍴 Quick Zaikaa

> **Quick Zaikaa** — A modern, full-stack food-delivery web app (Swiggy/Zomato inspired) built with the **MERN stack** + **Socket.IO**. Browse restaurants & food near you, add items to cart, pay online via **Razorpay** (or Cash on Delivery), and track your delivery **live on a map**. It has **three roles**: regular Users, Restaurant Owners, and Delivery Boys — each with their own dashboard and workflow.

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel)](https://quick-zaikaa.onrender.com)
[![React](https://img.shields.io/badge/Frontend-React%2019-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Backend-Node%20JS-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.IO-black?style=for-the-badge&logo=socket.io)](https://socket.io/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [👥 Roles & Workflows](#-roles--workflows)
- [🧰 Tech Stack](#-tech-stack)
- [📸 Screenshots](#-screenshots)
- [📂 Project Structure](#-project-structure)
- [🗄️ Database Models](#-database-models)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#️-environment-variables)
- [🔌 API Reference](#-api-reference)
- [📡 Socket.IO Events](#-socketio-events)
- [♻️ Deployment](#️-deployment)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)
- [📜 License](#-license)

---

## ✨ Features

### 👤 User (Customer)
- 🔐 Register / Login (email + password) with **JWT cookie** auth
- 🔑 **Google Sign-In** (via Firebase)
- 🔍 Search food items across all cities
- 🏙️ Location-based city detection (geolocation via Leaflet map)
- 🏪 Browse restaurants & food in your city
- 🌱 Veg / Non-Veg toggle
- 🛒 Cart with add, remove, quantity update & live subtotal
- 💳 Online payment via **Razorpay** (test mode) or **Cash on Delivery (COD)**
- 📍 Place orders with a **map-picked delivery address**
- 🗺️ **Live order tracking** — watch the delivery boy move on the map in real time
- 🔢 **OTP-based delivery** — confirm delivery with a 6-digit OTP sent to email
- 📦 Order history (`/my-orders`)

### 🏪 Restaurant Owner
- 🏠 Manage your restaurant (name, city, state, address, image)
- ➕ Add / ✏️ Edit / ❌ Delete food items (image upload via Cloudinary)
- 🗂️ Categorize items (Snacks, Main Course, Pizza, Burgers, Chinese, etc.)
- 📥 Real-time incoming order notifications (Socket.IO)
- 🔄 Update order status: `pending → preparing → out of delivery → delivered`
- 🚚 Auto-assign nearby **available delivery boys** when an order goes `out of delivery`
- 🕒 Pending orders dashboard

### 🛵 Delivery Boy
- 📲 Receive **broadcasted order assignments** in real time
- ✅ Accept / reject available deliveries
- 🧭 Navigate using live location (current order page)
- 📍 Update your live location so the user & owner can track you on the map
- 🔢 Send OTP to the customer & verify OTP to complete delivery
- 📈 **Stats dashboards** — deliveries per hour (today) & per day (month) with Recharts
- 📦 Delivered orders history

### 🎨 UI / UX
- ⚡ Vite-powered fast build & HMR
- 🎭 Shimmer / skeleton loading states
- 🎨 Tailwind CSS (responsive, mobile-friendly)
- 🗺️ Leaflet + React-Leaflet maps
- 📊 Recharts for stats visualizations

---

## 👥 Roles & Workflows

The app supports three roles (`role` field on the `User` model):

| Role | Who is it for? | Key screens |
|------|----------------|-------------|
| `user` | Anyone ordering food | Home, Cart, Checkout, Track Order, My Orders |
| `owner` | Restaurant owner | Edit Shop, Add/Edit Item, Pending Orders |
| `deliveryBoy` | Rider who delivers | Delivery Boy dashboard, Current Order, Delivered Orders, Stats |

### 🛒 Order lifecycle (full flow)
1. User picks items → adds to **cart** → goes to **checkout**
2. Chooses payment: **Razorpay (online)** or **COD**
3. Order is created; for online payment it is verified via `POST /api/order/verify-razorpay`
4. Owner gets a **real-time notification** (`orders:new`) for their shop-order
5. Owner updates status to `preparing`, then to `out of delivery`
6. System finds **online, nearby delivery boys** (geo-query within 50 km, excluding busy ones) and **broadcasts** the assignment (`delivery:newAssignment`)
7. A delivery boy **accepts** the assignment (`GET /api/order/accept-assignment/:assignmentId`)
8. Delivery boy sends OTP to the customer (`POST /api/order/send-otp`)
9. Delivery boy's live location is streamed to the customer via Socket.IO
10. Customer shares the OTP; delivery boy verifies it → order marked **delivered**

---

## 🧰 Tech Stack

### Frontend (`frontend/`)
| Tech | Purpose |
|------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool & dev server |
| **Redux Toolkit + React-Redux** | Global state (user, cart, orders, socket) |
| **React Router DOM v7** | Routing |
| **Tailwind CSS v4** | Styling |
| **Axios** | HTTP client |
| **Socket.IO Client** | Real-time events |
| **Firebase Auth** | Google Sign-In |
| **React-Leaflet / Leaflet** | Maps & live tracking |
| **Recharts** | Delivery-boy stats charts |

### Backend (`backend/`)
| Tech | Purpose |
|------|---------|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose 8** | Database & ODM |
| **JWT (jsonwebtoken)** | Auth tokens (10-day expiry, httpOnly cookie) |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Image upload & CDN |
| **Multer** | File upload parsing |
| **Nodemailer** | Email (password reset OTP + delivery OTP) |
| **Razorpay** | Online payment gateway |
| **Socket.IO** | Real-time: order notifications, live tracking, assignments |
| **Nodemon** | Dev auto-restart |

---

## 📸 Screenshots

> Screenshots of the website.

| Home Page | Owner Dashboard | Delivery Boy Dashboard |
|-----------|-----------------|------------------------|
| ![Home](./Screenshot%202025-09-15%20181501.png) | ![Owner Dashboard](./Screenshot%202025-09-15%20181423.png) | ![Delivery Boy Dashboard](./Screenshot%202025-09-15%20181556.png) |

---

## 📂 Project Structure

```
quick-zaikaa/
│
├─ backend/                        # Node.js + Express API
│  ├─ config/
│  │  ├─ db.js                     # MongoDB connection
│  │  ├─ token.js                  # JWT token generator
│  │  ├─ mail.js                   # Nodemailer (OTP emails)
│  │  └─ cloudinary.js             # Cloudinary image upload
│  ├─ controllers/
│  │  ├─ auth.controllers.js       # Signup/Signin/GoogleAuth/OTP/reset
│  │  ├─ user.controllers.js       # Current user, search, location
│  │  ├─ shop.controllers.js       # Shop CRUD
│  │  ├─ item.controllers.js       # Item CRUD
│  │  └─ order.controller.js       # Orders, Razorpay, assignments, OTP, stats
│  ├─ middlewares/
│  │  ├─ isAuth.js                 # JWT auth guard
│  │  └─ multer.js                 # File upload middleware
│  ├─ models/
│  │  ├─ user.model.js
│  │  ├─ shop.model.js
│  │  ├─ item.model.js
│  │  ├─ order.model.js
│  │  └─ deliveryAssignment.model.js
│  ├─ routes/
│  │  ├─ auth.routes.js
│  │  ├─ user.routes.js
│  │  ├─ shop.routes.js
│  │  ├─ item.routes.js
│  │  └─ order.routes.js
│  ├─ public/                      # Multer temp upload folder
│  ├─ socket.js                    # Socket.IO event handlers
│  ├─ index.js                     # Server entry point
│  ├─ .env.example
│  └─ package.json
│
└─ frontend/                       # React + Vite app
   ├─ public/
   └─ src/
      ├─ assets/                   # Static images
      ├─ components/               # Nav, Footer, FoodCard, dashboards, tracking...
      ├─ hooks/                    # Data-fetching hooks (getAllShops, getCity, etc.)
      ├─ pages/                    # Home, SignIn, Cart, Checkout, TrackOrder...
      ├─ redux/
      │  ├─ store.js               # Redux store
      │  └─ userSlice.js           # User/cart/order/socket state
      ├─ utils/
      │  └─ firebase.js            # Firebase config (Google Auth)
      ├─ App.jsx                   # Routes
      ├─ main.jsx
      └─ index.css
```

---

## 🗄️ Database Models

### 👤 User (`users`)
`fullName`, `email` (unique), `password` (hashed), `mobile`, `role` (`user` | `owner` | `deliveryBoy`), `resetOtp`, `otpExpires`, `isOtpVerified`, `orders[]`, `location` (GeoJSON Point), `isOnline`, `socketId`.

### 🏪 Shop (`shops`)
`name`, `image`, `city`, `state`, `address`, `owner` (ref User), `items[]` (ref Item).

### 🍕 Item (`items`)
`shop` (ref Shop), `name`, `price`, `category` (enum: Snacks, Main Course, Desserts, Pizza, Burgers, Sandwiches, South Indian, North Indian, Chinese, Fast Food, Others), `image`, `availability`, `rating` (`{average, count}`), `type` (`veg` | `non veg`).

### 📦 Order (`orders`)
`user` (ref User), `address` (`{text, latitude, longitude}`), `paymentMethod` (`cod` | `online`), `totalAmount`, `payment` (bool), `razorpayOrderId`, `razorpayPaymentId`, and `shopOrders[]` — each containing:
`shop`, `owner`, `items[]` (`{item, name, price, quantity}`), `subtotal`, `status` (`pending | preparing | out of delivery | delivered`), `assignedDeliveryBoy`, `assignment`, `deliveryBoyLocation`, `deliveryOtp`, `otpExpiresAt`, `deliveredAt`.

### 🛵 DeliveryAssignment (`deliveryassignments`)
`order`, `shop`, `shopOrderId`, `broadcastedTo[]` (candidate delivery boys), `assignedTo`, `status` (`broadcasted | assigned | enroute | completed | expired`), `acceptedAt`.

---

## 🚀 Getting Started

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) **18+** and npm
- A **MongoDB** database — [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) or local
- Accounts / keys for optional features:
  - [Cloudinary](https://cloudinary.com/) — image uploads
  - [Razorpay](https://razorpay.com/) — online payments (test keys)
  - [Firebase](https://console.firebase.google.com/) — Google Sign-In
  - A **Gmail** account with an [App Password](https://myaccount.google.com/apppasswords) — for OTP emails

> 💡 All these services have **free tiers / test modes**, so you can run the full app without paying anything.

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/quick-zaikaa.git
cd quick-zaikaa
```

#### Backend
```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env    # then fill in your values

# Start the development server (http://localhost:8000)
npm run dev
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env    # then fill in your values

# Start the Vite dev server
npm run dev
```

Then open the URL shown in the frontend terminal (usually **http://localhost:5173**).

> ⚠️ **CORS note:** `backend/index.js` currently allows requests only from `https://quick-zaikaa.onrender.com`. For local development, change the `origin` in both the CORS config and the Socket.IO config to `http://localhost:5173` (and update `serverUrl` in `frontend/src/App.jsx` to `http://localhost:8000`).

---

## ⚙️ Environment Variables

### Backend — `backend/.env`
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `MONGOURL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/quickzaika` |
| `JWT_SECRET` | Secret for signing auth tokens | `a-very-long-random-string` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `dmyexample` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcDEF...` |
| `EMAIL` | Gmail address for sending OTPs | `you@gmail.com` |
| `EMAIL_PASS` | Gmail **App Password** | `abcd efgh ijkl mnop` |
| `RAZORPAY_KEY_ID` | Razorpay test/live key ID | `rzp_test_xxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | `xxxxxx` |

### Frontend — `frontend/.env`
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_APIKEY` | Firebase web API key (Google Sign-In) | `AIzaSy...` |
| `VITE_RAZORPAY_KEY_ID` | Must match backend `RAZORPAY_KEY_ID` | `rzp_test_xxxxxxxx` |

> 🔒 **Never commit real `.env` files.** They are already ignored via `.gitignore`. Only commit `.env.example` with placeholder values.

---

## 🔌 API Reference

All routes (except `/api/health`) require the `token` cookie (set after sign-in). Base URL: `http://localhost:8000` (dev).

### 🔐 Auth — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register (fullName, email, password, role, mobile) |
| POST | `/signin` | Login (email, password) |
| GET | `/signout` | Logout (clears cookie) |
| POST | `/googleauth` | Login/register via Google (fullName, email, role) |
| POST | `/sendotp` | Send password-reset OTP to email |
| POST | `/verifyotp` | Verify reset OTP |
| POST | `/resetpassword` | Set new password (email, password) |

### 👤 User — `/api/user`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/current` | Get the logged-in user |
| POST | `/update-location` | Update user lat/lng (GeoJSON) |
| GET | `/search-items` | Search food items by keyword |

### 🏪 Shop — `/api/shop`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getall` | List all shops |
| GET | `/getcurrent` | Get the current owner's shop |
| POST | `/editshop` | Create/update shop (multipart, `image` field) |
| GET | `/getshopsbycity/:city` | Shops filtered by city |
| GET | `/getshopbyid/:shopId` | Shop by ID |

### 🍕 Item — `/api/item`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getitemsbyshop/:shopId` | Items of a shop |
| GET | `/getitemsbycity/:city` | Items available in a city |
| POST | `/additem` | Add item (multipart, `image` field) |
| POST | `/edititem/:itemId` | Edit item |
| GET | `/delete/:itemId` | Delete item |
| GET | `/getbyid/:itemId` | Item by ID |

### 📦 Order — `/api/order`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/placeorder` | Place order (cartItems, address, paymentMethod) |
| POST | `/verify-razorpay` | Verify Razorpay payment (razorpay_payment_id, orderId) |
| GET | `/getmy` | My orders (customer) |
| GET | `/shop-orders` | Orders for the owner's shop |
| POST | `/update-order-status/:orderId/:shopId` | Update shop-order status + broadcast assignment |
| GET | `/getassignments` | Delivery boy: broadcasted assignments |
| GET | `/accept-assignment/:assignmentId` | Delivery boy: accept a delivery |
| GET | `/current-order` | Delivery boy: currently active order |
| POST | `/update-location` | Delivery boy: update live location |
| GET | `/delivery-location/:orderId/:shopOrderId` | Get delivery boy's current location |
| POST | `/send-otp` | Generate & email delivery OTP |
| POST | `/verify-otp` | Verify delivery OTP → mark delivered |
| GET | `/stats/today` | Delivery boy: today's stats (per hour) |
| GET | `/stats/month` | Delivery boy: monthly stats (per day) |
| GET | `/my-delivered-orders` | Delivery boy: delivered orders list |
| GET | `/my-location` | Get logged-in user's saved location |
| GET | `/:orderId` | Full order detail |

### 🩺 Health — `/api/health`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server + MongoDB ping status |

---

## 📡 Socket.IO Events

### Client → Server
| Event | Payload | Purpose |
|-------|---------|---------|
| `identify` | `{ userId }` | Register socket + join `user_<id>` room |
| `joinOrder` | `{ orderId }` | Join `order_<id>` room for live tracking |
| `delivery:location:update` | `{ assignmentId, latitude, longitude }` | Delivery boy streams live location |

### Server → Client
| Event | Payload | Purpose |
|-------|---------|---------|
| `orders:new` | `{ ownerId, order }` | Owner receives new order in real time |
| `orders:statusUpdated` | `{ shopOrder, orderId }` | Order status changed |
| `delivery:newAssignment` | `{ assignmentId, orderId, shopId, shopName, address, items, subtotal }` | Delivery boy receives a new delivery offer |
| `delivery:location:live` | `{ assignmentId, latitude, longitude, at }` | Live location streamed to order room |
| `delivery:locationUpdate` | `{ deliveryBoyId, longitude, latitude, orderId, shopOrderId }` | Global location update broadcast |

---

## ♻️ Deployment

The app is split into two deployable parts. **Render** (or Railway/Fly.io) is a good fit for both.

### Backend
1. Create a web service pointing at the `backend/` folder
2. Build/start command: `npm install && npm run dev` (or use a process manager for production)
3. Add all backend env variables in the dashboard
4. **CORS:** update `origin` in `index.js` to your frontend URL
5. Socket.IO is already wired to the same Express HTTP server, so no extra service is needed

### Frontend
1. Deploy the `frontend/` folder on **Vercel / Netlify / Render static**
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add `VITE_FIREBASE_APIKEY` and `VITE_RAZORPAY_KEY_ID`
5. Update `serverUrl` in `frontend/src/App.jsx` to your deployed backend URL

> ⚠️ If frontend and backend are on different domains, make sure cookies work: the backend sets `secure: true` and `sameSite: "none"` — this requires an **HTTPS** frontend (both Vercel & Netlify provide it by default).

---

## 🤝 Contributing

1. Fork the repository 🍴
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push & open a Pull Request 🚀

Please include a clear description + screenshots for UI changes.

---

## 👨‍💻 Author

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sourav-kumar-01250b30b/)

---

## 📜 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

⭐ If you like this project, give it a star on GitHub!
