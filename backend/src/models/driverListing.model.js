const mongoose = require("mongoose");

const driverListingSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: { createdAt: true, updatedAt: false },
});

driverListingSchema.index({ from: 1, to: 1, date: 1 });

const DriverListing = mongoose.model("DriverListing", driverListingSchema);

module.exports = DriverListing;
