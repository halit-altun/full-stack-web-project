# Amazing E-commerce Platform

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. Features include user authentication, product management, shopping cart functionality, order processing, and address management.

Screenshot
![Ekran görüntüsü 2024-11-28 182358](https://github.com/user-attachments/assets/9d114ebe-ff23-467e-a180-4f8acf165465)
![Ekran görüntüsü 2024-11-28 182415](https://github.com/user-attachments/assets/275f615d-24f2-4871-ad2b-a126b11e2664)
![Ekran görüntüsü 2024-11-28 182633](https://github.com/user-attachments/assets/f573b66c-f65d-4081-90e8-e22702cf9a93)
![Ekran görüntüsü 2024-11-28 182708](https://github.com/user-attachments/assets/47e59ce8-afc5-4829-a808-fdd6459b7ccc)
![Ekran görüntüsü 2024-11-28 182739](https://github.com/user-attachments/assets/8e9af59c-2729-486a-a0c4-44651c4d9c85)
![Ekran görüntüsü 2024-11-28 182818](https://github.com/user-attachments/assets/f3ead0a1-04ea-4931-8a79-7278d2a88768)
![Ekran görüntüsü 2024-11-28 183011](https://github.com/user-attachments/assets/e27ff94a-19c6-4af1-a50a-96eb422bf82d)
![Ekran görüntüsü 2024-11-28 183022](https://github.com/user-attachments/assets/7e362c64-b6a7-4b60-a90a-6fdadfdcd482)
![Ekran görüntüsü 2024-11-28 183106](https://github.com/user-attachments/assets/221ec7d0-11d7-42c4-ad63-f790381e9287)
![Ekran görüntüsü 2024-11-28 183113](https://github.com/user-attachments/assets/ab3a70df-1373-4848-bafd-b7a4f20e5d8a)
![Ekran görüntüsü 2024-11-28 183058](https://github.com/user-attachments/assets/7474d3cc-031b-4395-8f61-b29aa347e863)
![Ekran görüntüsü 2024-11-28 183121](https://github.com/user-attachments/assets/a022ff32-af02-43f3-8075-a06e8d3e5f81)
![Ekran görüntüsü 2024-11-28 183221](https://github.com/user-attachments/assets/5b4a84a4-3610-4962-b23e-0d0ab61b810d)



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
