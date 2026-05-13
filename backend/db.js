const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('bufferTimeoutMS', 5000);

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB bağlantısı başarılı');
}

module.exports = connectDB;
