const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  secretKey: {
    type: String,
    required: true
  }
});

module.exports = Admin = mongoose.model('admin', Admin);
