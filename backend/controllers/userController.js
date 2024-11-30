const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const Order = require('../models/Order');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/emailUtils');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check email
    const userExistsWithEmail = await User.findOne({ email });
    if (userExistsWithEmail) {
      return res.status(400).json({ 
        success: false,
        message: 'This email address is already in use'
      });
    }

    // Check phone number
    const userExistsWithPhone = await User.findOne({ 'phone.number': phone.number });
    if (userExistsWithPhone) {
      return res.status(400).json({ 
        success: false,
        message: 'This phone number is already in use'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });

    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        },
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred during user registration',
      error: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.json({
        token,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if phone number is already in use by another user
    if (req.body.phone) {
      const phoneExists = await User.findOne({ 
        phone: req.body.phone,
        _id: { $ne: req.user.id }
      });
      
      if (phoneExists) {
        return res.status(400).json({ 
          message: 'This phone number is already in use',
          messageKey: 'phoneExists'  // Add a messageKey for frontend translation
        });
      }
    }

    const { firstName, lastName, email, phone } = req.body;

    // Check if new email is already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'This email address is already in use' });
      }
    }

    // Phone number validation and check if it's already in use
    if (phone?.number && phone.number !== user.phone.number) {
      // First validate format
      if (!/^\d{10}$/.test(phone.number)) {
        return res.status(400).json({
          message: 'Phone number must be 10 digits and only contain numbers'
        });
      }

      // Then check if phone number is already in use
      const existingUserWithPhone = await User.findOne({
        'phone.number': phone.number,
        _id: { $ne: user._id } // Exclude current user from check
      });

      if (existingUserWithPhone) {
        return res.status(400).json({
          message: 'This phone number is already in use'
        });
      }
    }

    // Update user information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    if (phone) {
      user.phone = {
        countryCode: phone.countryCode || user.phone.countryCode,
        number: phone.number || user.phone.number
      };
    }

    const updatedUser = await user.save();

    // Remove sensitive information
    const userResponse = {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone
    };

    res.json(userResponse);

  } catch (error) {
    logger.error('Profile update failed:', {
      error: error.message,
      userId: req.user?.id
    });
    res.status(500).json({ message: 'Profile update failed' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    console.log('Fetching orders for user:', req.user.id);

    const orders = await Order.find({ user: req.user.id })
      .populate('products.product', 'title price image')
      .populate('deliveryAddress')
      .sort({ createdAt: -1 });

    console.log('Found orders:', JSON.stringify(orders, null, 2));

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'Orders not found'
      });
    }

    res.json({
      success: true,
      orders: orders
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    logger.error('Get user orders error:', {
      error: error.message,
      userId: req.user?.id
    });
    res.status(500).json({ 
      success: false,
      message: 'An error occurred while fetching orders' 
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    logger.info('Password changed successfully', {
      userId: user._id
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    logger.error('Password change error:', {
      error: error.message,
      userId: req.user?.id
    });
    res.status(500).json({ message: 'Password change failed' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user by token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired password reset link'
      });
    }

    // Check if new password is same as current
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: 'New password cannot be the same as the old password'
      });
    }

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ 
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    logger.error('Password reset error:', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      message: 'Password reset failed'
    });
  }
};

// Password reset request
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email address'
      });
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour validity
    await user.save();

    // Send email
    await sendPasswordResetEmail(email, resetToken);

    logger.info('Password reset email sent successfully', { email });

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email address'
    });

  } catch (error) {
    logger.error('Password reset request failed:', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      message: 'Password reset request failed. Please try again later.'
    });
  }
};

// Email kontrolü için yeni fonksiyon
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    res.json({ exists: !!user });
  } catch (error) {
    logger.error('Email check failed:', {
      error: error.message,
      email: req.body.email
    });
    res.status(500).json({ message: 'Email check failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getUserOrders,
  changePassword,
  resetPassword,
  forgotPassword,
  checkEmail
};
