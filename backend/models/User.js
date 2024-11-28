const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Ad alanı zorunludur'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Soyad alanı zorunludur'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email alanı zorunludur'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Geçerli bir email adresi giriniz']
  },
  phone: {
    countryCode: {
      type: String,
      required: [true, 'Ülke kodu zorunludur']
    },
    number: {
      type: String,
      required: [true, 'Telefon numarası zorunludur'],
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} geçerli bir telefon numarası değil. Telefon numarası 10 haneli ve sadece rakamlardan oluşmalıdır.`
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Parola alanı zorunludur'],
    minlength: [6, 'Parola en az 6 karakter olmalıdır']
  },
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    currentTime: () => new Date(Date.now() + (3 * 60 * 60 * 1000))
  }
});

module.exports = mongoose.model('User', userSchema);
