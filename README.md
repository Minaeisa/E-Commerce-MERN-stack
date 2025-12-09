# 🛍️ E-Commerce MERN Stack

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project provides a complete online shopping experience with user authentication, product management, shopping cart, order processing, and admin dashboard.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT tokens
- Password encryption using bcrypt
- Forgot password with email reset link
- Role-based access control (User & Admin)
- Protected routes and API endpoints

### 🛒 Shopping Experience
- Browse products by category
- Search and filter products
- Product details with ratings and reviews
- Add to cart functionality
- Shopping cart management
- Checkout process with order summary

### 📦 Order Management
- Create and track orders
- Order history for users
- Payment method selection (Stripe, PayPal, Cash)
- Order status tracking (Paid/Unpaid, Delivered/Processing)

### 👨‍💼 Admin Dashboard
- Product management (Create, Read, Update, Delete)
- User management (View, Delete users)
- Order management (View all orders, update status)
- Inventory tracking
- Sales analytics

### 🎨 User Interface
- Responsive design (Mobile, Tablet, Desktop)
- Dark mode support
- Modern UI with Tailwind CSS
- Smooth animations with Framer Motion
- Product sliders and carousels
- Toast notifications

### 🔒 Security Features
- JWT token authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- Helmet.js for HTTP headers security
- CORS protection
- Input validation with express-validator
- MongoDB injection protection

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Bootstrap** - UI components
- **Framer Motion** - Animations
- **React Slick** - Carousel component
- **AOS** - Scroll animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt.js** - Password hashing
- **Nodemailer** - Email service
- **Express Rate Limit** - API rate limiting
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

---

## 🎯 Key Features Explained

### Authentication Flow
1. User registers with email and password
2. Password is hashed using bcrypt (10 salt rounds)
3. JWT token is generated and sent to client
4. Token is stored in localStorage
5. Token is sent with every API request in Authorization header
6. Backend verifies token and attaches user to request

### Password Reset Flow
1. User requests password reset with email
2. Backend generates random token and hashes it
3. Token is saved to database with 10-minute expiry
4. Email is sent with reset link containing original token
5. User clicks link and enters new password
6. Backend verifies token hash and updates password

### Shopping Cart
- Cart data stored in localStorage
- Persists across page refreshes
- Real-time updates with storage events
- Quantity management
- Total price calculation

### Admin Features
- **Product Management**: Full CRUD operations
- **User Management**: View and delete users
- **Order Management**: View all orders and update status
- **Inventory Tracking**: Monitor stock levels

---

## 🔐 Security Best Practices

✅ **JWT Authentication** - Secure token-based auth  
✅ **Password Hashing** - Bcrypt with 10 salt rounds  
✅ **Rate Limiting** - 100 requests per 15 minutes  
✅ **Helmet.js** - Secure HTTP headers  
✅ **CORS** - Controlled cross-origin access  
✅ **Input Validation** - Express-validator  
✅ **MongoDB Injection Protection** - Mongoose sanitization  
✅ **Environment Variables** - Sensitive data protection  

---

## 👨‍💻 Author

**Mina Eisa**

- GitHub: [@Minaeisa](https://github.com/Minaeisa)
- Repository: [E-Commerce-MERN-stack](https://github.com/Minaeisa/E-Commerce-MERN-stack)
--
**⭐ If you like this project, please give it a star on GitHub! ⭐**
