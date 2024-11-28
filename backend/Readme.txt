# E-Commerce Backend API

A robust RESTful API built with Node.js, Express, and MongoDB to power an e-commerce platform.

## Features

- User authentication and authorization with JWT
- Product management
- Shopping cart functionality
- Order processing
- Address management
- Password reset with email notifications
- CSRF protection
- Comprehensive error handling and logging

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:
env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_address
EMAIL_PASSWORD=your_email_app_password
NODE_ENV=development

## Installation

1. Clone the repository:
bash
git clone <repository-url>
cd backend

2. Install dependencies:
bash
npm install

3. Start the development server:
bash
npm start

The server will start on port 5000 (or the port specified in your environment variables).

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password/:token` - Reset password
- `POST /api/users/change-password` - Change password (authenticated)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin only)
- `GET /api/products/categories` - Get all product categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/users/orders` - Get user's orders (authenticated)

### Addresses
- `GET /api/addresses` - Get user's addresses
- `POST /api/addresses` - Add new address
- `PUT /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address

## Security Features

- JWT authentication
- Password hashing with bcrypt
- CSRF protection
- Rate limiting
- Secure HTTP headers
- Input validation and sanitization

## Error Handling

The API implements comprehensive error handling with:
- Custom error messages
- Appropriate HTTP status codes
- Error logging with Winston

## Logging

Logs are stored in the `logs` directory:
- `error.log` - Error level logs
- `combined.log` - All logs

## Database Schema

### User
- First name
- Last name
- Email
- Password (hashed)
- Phone
- Addresses
- Orders
- Admin status

### Product
- Title
- Image
- Description
- Price
- Rating
- Stock count
- Category

### Order
- User reference
- Products array
- Delivery address
- Total amount
- Status
- Timestamps

### Address
- User reference
- Title
- Full address
- City
- District
- Postal code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Halit ALTUN - halitaltun002@gmail.com
Project Link: [https://github.com/halit-altun/fullstack-web-project]