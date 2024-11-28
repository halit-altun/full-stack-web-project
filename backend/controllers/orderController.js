const Order = require('../models/Order');
const logger = require('../utils/logger');

const createOrder = async (req, res) => {
  try {
    const { products, deliveryAddress, totalAmount } = req.body;
    
    const newOrder = new Order({
      user: req.user.id,
      products,
      deliveryAddress: {
        title: deliveryAddress.title,
        fullAddress: deliveryAddress.fullAddress,
        city: deliveryAddress.city,
        district: deliveryAddress.district,
        postalCode: deliveryAddress.postalCode
      },
      totalAmount,
      status: 'pending'
    });

    const savedOrder = await newOrder.save();

    logger.info({
      message: 'Order created successfully',
      userId: req.user.id,
      orderId: savedOrder._id
    });

    res.status(201).json({
      success: true,
      order: savedOrder
    });
  } catch (error) {
    logger.error({
      message: 'Order creation failed',
      error: error.message,
      userId: req.user?.id
    });
    res.status(500).json({
      success: false,
      message: 'Sipariş oluşturulurken bir hata oluştu'
    });
  }
};

module.exports = {
  createOrder
};
