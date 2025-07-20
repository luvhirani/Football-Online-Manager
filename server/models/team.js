const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, unique: true },
  budget: { type: Number, default: 5000000 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

module.exports = mongoose.model("Team", teamSchema);
