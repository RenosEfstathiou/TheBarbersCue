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
  time: {
    type: String,
    required: true
  },
  barber: {
    type: String,
    required: true
  }
});

module.exports = Reservation = mongoose.model(
  'reservation',
  ReservationsSchema
);
