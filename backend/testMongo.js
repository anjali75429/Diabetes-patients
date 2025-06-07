require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Successfully connected to MongoDB Atlas');
  mongoose.connection.close();
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
