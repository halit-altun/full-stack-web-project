const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrder } = require('../controllers/orderController');

router.post('/', protect, createOrder);

module.exports = router;
