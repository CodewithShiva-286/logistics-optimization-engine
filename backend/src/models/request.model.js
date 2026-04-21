const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pickup: {
    type: String,
    required: true,
    trim: true,
  },
  drop: {
    type: String,
    required: true,
    trim: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "matched", "completed"],
    default: "pending",
  },
}, {
  timestamps: { createdAt: true, updatedAt: false },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
