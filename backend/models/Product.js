const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Ürün başlığı zorunludur'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Ürün görseli zorunludur']
  },
  description: {
    type: String,
    required: [true, 'Ürün açıklaması zorunludur']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  price: {
    type: String,
    required: [true, 'Ürün fiyatı zorunludur']
  },
  count: {
    type: Number,
    required: [true, 'Ürün stok adedi zorunludur'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Ürün kategorisi zorunludur']
  }
}, {
  timestamps: {
    currentTime: () => new Date(Date.now() + (3 * 60 * 60 * 1000))
  }
});

module.exports = mongoose.model('Product', productSchema);
