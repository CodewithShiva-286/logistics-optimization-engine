const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, {
  timestamps: { createdAt: true, updatedAt: false },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
