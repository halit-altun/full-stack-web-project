const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Adres başlığı zorunludur'],
    trim: true
  },
  fullAddress: {
    type: String,
    required: [true, 'Adres detayı zorunludur'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Şehir bilgisi zorunludur'],
    trim: true
  },
  district: {
    type: String,
    required: [true, 'İlçe bilgisi zorunludur'],
    trim: true
  },
  postalCode: {
    type: String,
    required: [true, 'Posta kodu zorunludur'],
    trim: true
  }
}, {
  timestamps: {
    currentTime: () => new Date(Date.now() + (3 * 60 * 60 * 1000))
  }
});

module.exports = mongoose.model('Address', addressSchema);
