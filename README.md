# Simple Ecommerce App

A full-stack e-commerce store built with React, Node.js, Express, and MongoDB featuring product listings, shopping cart, user authentication, and order processing.

---

## 🚀 Features

- User Registration & Login
- Product Listing Page
- Product Details Page
- Shopping Cart Functionality
- Order Processing
- Backend API for products, cart, orders, and authentication
- Database integration with MongoDB

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- TailwindCSS
- Axios
- React Router DOM
- Lucide React (for icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Database
- MongoDB

---

## 📂 Project Structure

```
Simple-Ecommerce-app/
│
├── Backend/
│   ├── index.js
│   ├── package.json
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   └── routes/
│       ├── authRoutes.js
│       ├── cartRoute.js
│       ├── orderRoutes.js
│       └── productRoutes.js
│
├── Frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── App.css
│       ├── index.css
│       ├── assets/
│       ├── components/
│       │   ├── Loader.jsx
│       │   ├── Navbar.jsx
│       │   ├── ProductCard.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── ToastContext.jsx
│       ├── hooks/
│       │   └── useAuth.js
│       ├── pages/
│       │   ├── Cart.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Orders.jsx
│       │   ├── ProductDetails.jsx
│       │   └── Register.jsx
│       ├── services/
│       │   └── api.js
│
└── README.md
```

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the Backend directory:
   ```
   cd Backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the Backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server:
   ```
   npm run server
   node index.js
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

The application will be running on `http://localhost:5173` (Vite default) and backend on `http://localhost:5000`.

---

## 🔧 Usage

1. Register a new user or login with existing credentials.
2. Browse products on the home page.
3. View product details by clicking on a product.
4. Add products to the cart.
5. Proceed to checkout and place orders.
6. View your orders in the Orders page.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.
