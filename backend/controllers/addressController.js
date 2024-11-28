const Address = require('../models/Address');
const logger = require('../utils/logger');

// Create new address
const createAddress = async (req, res) => {
  try {
    const { title, address, city, district, postalCode } = req.body;
    
    const newAddress = new Address({
      user: req.user.id,
      title,
      fullAddress: address,
      city,
      district,
      postalCode
    });

    const savedAddress = await newAddress.save();

    logger.info({
      message: 'Address created successfully',
      userId: req.user.id,
      addressId: savedAddress._id
    });

    res.status(201).json({
      success: true,
      address: savedAddress
    });
  } catch (error) {
    logger.error({
      message: 'Address creation failed',
      error: error.message,
      userId: req.user?.id
    });
    res.status(500).json({ 
      success: false, 
      message: 'Adres eklenirken bir hata oluştu',
      error: error.message
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Adres bulunamadı'
      });
    }

    await Address.findByIdAndDelete(req.params.id);

    logger.info({
      message: 'Address deleted successfully',
      userId: req.user.id,
      addressId: req.params.id
    });

    res.json({
      success: true,
      message: 'Adres başarıyla silindi'
    });
  } catch (error) {
    logger.error({
      message: 'Address deletion failed',
      error: error.message,
      userId: req.user?.id,
      addressId: req.params.id
    });
    res.status(500).json({
      success: false,
      message: 'Adres silinirken bir hata oluştu'
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { title, address, city, district, postalCode } = req.body;
    
    const existingAddress = await Address.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!existingAddress) {
      return res.status(404).json({
        success: false,
        message: 'Adres bulunamadı'
      });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      {
        title,
        fullAddress: address,
        city,
        district,
        postalCode
      },
      { new: true }
    );

    logger.info({
      message: 'Address updated successfully',
      userId: req.user.id,
      addressId: req.params.id
    });

    res.json({
      success: true,
      address: updatedAddress
    });
  } catch (error) {
    logger.error({
      message: 'Address update failed',
      error: error.message,
      userId: req.user?.id,
      addressId: req.params.id
    });
    res.status(500).json({
      success: false,
      message: 'Adres güncellenirken bir hata oluştu'
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });

    logger.info({
      message: 'Addresses fetched successfully',
      userId: req.user.id,
      count: addresses.length
    });

    res.json({
      success: true,
      addresses
    });
  } catch (error) {
    logger.error({
      message: 'Fetching addresses failed',
      error: error.message,
      userId: req.user?.id
    });
    res.status(500).json({
      success: false,
      message: 'Adresler getirilirken bir hata oluştu'
    });
  }
};

module.exports = {
  createAddress,
  deleteAddress,
  updateAddress,
  getAddresses
}; 