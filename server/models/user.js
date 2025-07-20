const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  budget: { type: Number, default: 5000000 },
});

module.exports = mongoose.model('User', userSchema);
