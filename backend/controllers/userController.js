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
        message: 'Bu e-posta adresi zaten kullanılmaktadır'
      });
    }

    // Check phone number
    const userExistsWithPhone = await User.findOne({ 'phone.number': phone.number });
    if (userExistsWithPhone) {
      return res.status(400).json({ 
        success: false,
        message: 'Bu telefon numarası zaten kullanılmaktadır'
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
      message: 'Kullanıcı kaydı sırasında bir hata oluştu',
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
      res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const { firstName, lastName, email, phone } = req.body;

    // Check if new email is already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Bu email adresi zaten kullanımda' });
      }
    }

    // Phone number validation
    if (req.body.phone?.number) {
      const phoneNumber = req.body.phone.number;
      if (!/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({
          message: 'Telefon numarası 10 haneli ve sadece rakamlardan oluşmalıdır'
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
    logger.error('Profile update error:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ message: 'Profil güncellenirken bir hata oluştu' });
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
        message: 'Siparişler bulunamadı'
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
      message: 'Siparişler getirilirken bir hata oluştu' 
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
      return res.status(400).json({ message: 'Mevcut şifre yanlış' });
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

    res.json({ message: 'Şifre başarıyla değiştirildi' });
  } catch (error) {
    logger.error('Password change error:', {
      error: error.message,
      userId: req.user?.id
    });
    res.status(500).json({ message: 'Şifre değiştirme işlemi başarısız oldu' });
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
        message: 'Şifre sıfırlama linki geçersiz veya süresi dolmuş'
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
      message: 'Şifreniz başarıyla güncellendi'
    });

  } catch (error) {
    logger.error('Password reset error:', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      message: 'Şifre sıfırlama başarısız oldu'
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
        message: 'Lütfen e-posta adresinizi giriniz'
      });
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz e-posta formatı'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı'
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
      message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi'
    });

  } catch (error) {
    logger.error('Password reset request failed:', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      message: 'Şifre sıfırlama isteği gönderilemedi. Lütfen daha sonra tekrar deneyin.'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getUserOrders,
  changePassword,
  resetPassword,
  forgotPassword
};
