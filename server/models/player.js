const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  position: String,
  price: Number,
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  forSale: { type: Boolean, default: false },
  askingPrice: Number
});

module.exports = mongoose.model('Player', playerSchema);
