const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  createAddress, 
  deleteAddress, 
  updateAddress, 
  getAddresses 
} = require('../controllers/addressController');

router.get('/', protect, getAddresses);
router.post('/', protect, createAddress);
router.delete('/:id', protect, deleteAddress);
router.put('/:id', protect, updateAddress);

module.exports = router;  