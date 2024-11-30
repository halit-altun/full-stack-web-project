const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile, getUserOrders, changePassword, resetPassword, forgotPassword, checkEmail } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/profile', protect, updateProfile);
router.get('/orders', protect, getUserOrders);
router.post('/change-password', protect, changePassword);
router.post('/reset-password/:token', resetPassword);
router.post('/forgot-password', forgotPassword);
router.post('/check-email', checkEmail);

module.exports = router;
