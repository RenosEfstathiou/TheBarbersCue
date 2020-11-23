const mongoose = require('mongoose');

const ReservationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  barber: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'barber'
    },
    name: {
      type: String
    }
  }
});

module.exports = Reservation = mongoose.model(
  'reservation',
  ReservationsSchema
);
