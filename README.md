# Amazing E-commerce Platform

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. Features include user authentication, product management, shopping cart functionality, order processing, and address management.

## Features

- 🔐 User Authentication & Authorization
- 🛍️ Product Browsing & Search
- 🛒 Shopping Cart Management
- 📦 Order Processing
- 📍 Address Management
- 💳 Secure Checkout Process
- 📱 Responsive Design
- 🔒 CSRF Protection
- 📧 Password Reset via Email
- 🎨 Material-UI Components

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Material-UI
- React Router
- Axios
- React Hot Toast
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- Winston Logger
- CORS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
bash
git clone https://github.com/halit-altun/fullstack-web-project.git
cd amazing-ecommerce

2. Install Backend Dependencies
bash
cd backend
npm install

3. Configure Environment Variables
Create a `.env` file in the backend directory with the following variables:
env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_app_password

4. Install Frontend Dependencies
bash
cd ../frontend
npm install


5. Start the Development Servers

Backend:
bash
cd backend
npm start

Frontend:
bash
cd frontend
npm start

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password/:token` - Reset password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get product categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

### Addresses
- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Add new address
- `PUT /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address

## Security Features

- JWT Authentication
- CSRF Protection
- Password Hashing
- Secure Password Reset
- Protected Routes
- Input Validation

  
## Support

Give a ⭐️ if this project helped you!
