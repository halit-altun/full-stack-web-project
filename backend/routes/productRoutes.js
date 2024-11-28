const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const { getAllProducts, getProductById, createProduct, getCategories } = require('../controllers/productController');

router.get('/categories', getCategories);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, isAdmin, createProduct);

module.exports = router;
