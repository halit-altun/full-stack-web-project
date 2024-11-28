const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      logger.warn('Authentication failed: No token provided', {
        path: req.path,
        method: req.method
      });
      return res.status(401).json({ message: 'Yetkilendirme başarısız' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      logger.info('Authentication successful', {
        userId: req.user._id,
        path: req.path
      });
      next();
    } catch (error) {
      logger.error('Token verification failed:', {
        error: error.message,
        token
      });
      return res.status(401).json({ message: 'Geçersiz token' });
    }
  } catch (error) {
    logger.error('Auth middleware error:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

module.exports = { protect };
