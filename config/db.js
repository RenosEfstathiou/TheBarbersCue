const mongoose = require('mongoose');
const config = require('config');

// we initialize the mongoURI
const db = config.get('mongoURI');

// We try to connect
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Mongo db connected.');
  } catch (err) {
    console.log(err);
    //   if an error occured while connecting then we exit the application with a status code of 1
    process.exit(1);
  }
};

module.exports = connectDB;
