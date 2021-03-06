const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reservation'
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Barber = mongoose.model('barber', BarberSchema);
