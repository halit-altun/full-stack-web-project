# Amazing.com E-commerce Platform

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. Features include user authentication, product management, shopping cart functionality, order processing, and address management.

Screenshots

![Ekran görüntüsü 2024-11-30 210317](https://github.com/user-attachments/assets/39222e2e-1383-405e-8a8d-d8992097864f)
![Ekran görüntüsü 2024-11-30 210329](https://github.com/user-attachments/assets/15c8f9f2-8811-430e-b81d-18e999382aa5)
![Ekran görüntüsü 2024-11-30 210416](https://github.com/user-attachments/assets/d7a79397-48dd-47ce-a42c-2f84be0f4213)
![Ekran görüntüsü 2024-11-30 210452](https://github.com/user-attachments/assets/406ea71b-2484-459d-81cd-25b8a27a43e7)
![Ekran görüntüsü 2024-11-30 210531](https://github.com/user-attachments/assets/5734abae-2bef-4846-be49-74ad5a940085)
![Ekran görüntüsü 2024-11-30 210614](https://github.com/user-attachments/assets/12afa311-2293-4469-8a0f-b1ee3880c2a5)
![Ekran görüntüsü 2024-11-30 210631](https://github.com/user-attachments/assets/33797842-3721-47b0-9fa8-41e337fda06a)
![Ekran görüntüsü 2024-11-30 210652](https://github.com/user-attachments/assets/073549fb-c96d-4d3d-9166-8e1915755d58)
![Ekran görüntüsü 2024-11-30 210659](https://github.com/user-attachments/assets/e6ddf300-52ec-4c94-9422-4fe9d80a8c9b)
![Ekran görüntüsü 2024-11-30 210734](https://github.com/user-attachments/assets/70062b56-9b87-405d-964a-dd229fd41723)
![Ekran görüntüsü 2024-11-30 210744](https://github.com/user-attachments/assets/efe48a28-4766-4d36-90c0-81cd2fc1bc2f)
![Ekran görüntüsü 2024-11-30 210831](https://github.com/user-attachments/assets/25b48c7a-afe5-4e7b-b4a2-228f9544cd50)
![Ekran görüntüsü 2024-11-30 210859](https://github.com/user-attachments/assets/e78ed6ae-cb0e-4e5a-ac80-f3b5cfdd2c94)




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
- 🌐 English-Turkish Language Support
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
git clone https://github.com/halit-altun/full-stack-web-project.git
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

## 📄 License

This project is [MIT](https://github.com/halit-altun/full-stack-web-project/blob/master/LICENSE) licensed.

## Contact

Halit ALTUN - [@halit-altun](https://github.com/halit-altun)

Project Link: [https://github.com/halit-altun/full-stack-web-project)
  
## Support

Give a ⭐️ if this project helped you!
