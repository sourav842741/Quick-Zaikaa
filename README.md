# 🍴 Quick Zaikaa

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel)](https://quick-zaikaa.onrender.com)
[![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/State-Redux-764ABC?style=for-the-badge&logo=redux)](https://redux.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

> **Quick Zaikaa** — A modern food-delivery web app (Swiggy-inspired). Browse restaurants, filter by ratings & budget, add food to cart, and enjoy smooth UI with shimmer effects & offline detection.  

---

## 📸 Screenshots

> Screenshots of the website.

| Home Page | Restaurant List | Cart |
|-----------|-----------------|------|
| ![Home](https://github.com/sourav842741/Quick-Zaikaa/blob/ab962b13307995743c08f6a4c97a3b7f1f64c0db/Screenshot%202025-09-15%20181501.png) | ![Restaurant List](./screenshots/restaurant-list.png) | ![Cart](./screenshots/cart.png) |

---

## ✨ Features

- 🔍 Restaurant search by name/cuisine  
- 🌱 Veg And Non Veg toggle  
- ⚡ Quick Delivery highlight  
- 🛒 Cart with add/remove & subtotal  
- 🎭 Shimmer UI for loading   
- 🌀 Live Tracking  
- 🌀 Otp Based Delivery

---

## 🧰 Tech Stack

- ⚛️ **React** + **Redux**  
- 🔀 **React Router DOM**  
- 📦 **Node JS**  
- 🧪 **Mongo DB** (Database)  
- 🎨 **Tailwind CSS** (responsive, modern)  
- 🛠 Custom hooks, shimmer UI, lazy loading  

---

## 📂 Project Structure
```base 
quick-zaikaa/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ hooks/
│  ├─ pages/
│  ├─ redux/
│  ├─ services/     # API wrappers
│  ├─ utils/
│  └─ App.jsx
├─ screenshots/
├─ .env
├─ package.json
└─ README.md
```
---

### ♻️ Deployment

**Quick Zaikaa can be deployed on Render, Vercel, or Netlify**.

**Build command: npm run build**

**Publish directory: build (or dist if configured)**

**Add .env variables in hosting dashboard**

---



### 🤝 Contributing

Fork the repo 🍴

Create a feature branch:

git checkout -b feature/your-feature


Commit your changes:

git commit -m "feat: add new feature"


Push & open a Pull Request 🚀

Please include clear description + screenshots for UI changes.

---

### 👨‍💻 Author

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sourav-kumar-01250b30b/)


---

📜 License

This project is licensed under the MIT License.
See LICENSE
 file for details.

⭐ If you like this project, give it a star on GitHub!

---


## 🚀 Getting Started

### Clone & Setup
```bash
# Clone repo
git clone https://github.com/<your-username>/quick-zaikaa.git
cd quick-zaikaa

# Install dependencies
npm install   # or yarn

# Start development
npm start     # or yarn start


# Production build
npm run build   # or yarn build

# Run tests
npm test        # or yarn test

```

### ⚙️ Environment Variables
# Backend
```bash
Create a .env file in the root directory:

PORT=
MONGOURL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL=
EMAIL_PASS =
RAZORPAY_KEY_ID =
RAZORPAY_KEY_SECRET =
```
### ⚙️ Environment Variables
# Frontend
```bash
Create a .env file in the root directory:

VITE_FIREBASE_APIKEY = 
VITE_RAZORPAY_KEY_ID = 


