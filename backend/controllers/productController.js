const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        title: { $regex: search, $options: 'i' }
      };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Ürün arama hatası:', error);
    res.status(500).json({
      message: 'Ürünler aranırken bir hata oluştu',
      error: error.message
    });
  }
};

// Get product detail
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Ürün getirilirken bir hata oluştu',
      error: error.message
    });
  }
};

// Add new product
const createProduct = async (req, res) => {
  try {
    const { title, image, description, rating, price, count, category } = req.body;

    const product = await Product.create({
      title,
      image,
      description,
      rating,
      price,
      count,
      category
    });

    res.status(201).json({
      message: 'Ürün başarıyla eklendi',
      product
    });
  } catch (error) {
    res.status(400).json({
      message: 'Ürün eklenirken bir hata oluştu',
      error: error.message
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Kategoriler getirilirken bir hata oluştu',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getCategories
};
