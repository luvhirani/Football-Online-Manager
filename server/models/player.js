const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: {
    type: String,
    enum: ["Goalkeeper", "Defender", "Midfielder", "Attacker"],
    required: true,
  },
  currentTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: false,
  },
  isTransferListed: {
    type: Boolean,
    default: false,
  },
  askingPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Player", playerSchema);
