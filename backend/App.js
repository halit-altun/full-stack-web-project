const express = require("express");
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const csrfMiddleware = require('./middleware/csrfMiddleware');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const connectDB = require("./config/db");
const logger = require('./utils/logger');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// CORS settings - Updated for CSRF
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
  exposedHeaders: ['XSRF-TOKEN']
}));

// JSON parser
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  name: 'sessionId', // Customize cookie name
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax', // More secure for CSRF
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

// Comment out CSRF middleware
// app.use(csrfMiddleware);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);

// Database connection
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(err.status || 500).json({
    message: err.message || 'Sunucu hatası oluştu'
  });
});

// 404 handler
app.use((req, res) => {
  logger.warn('404 Not Found:', {
    path: req.path,
    method: req.method
  });
  
  res.status(404).json({ message: 'Sayfa bulunamadı' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server ${PORT} portunda çalışıyor`);
});

