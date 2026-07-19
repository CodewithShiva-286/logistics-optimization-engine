const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/user.model");
const Request = require("../models/request.model");
const DriverListing = require("../models/driverListing.model");
const Match = require("../models/match.model");

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const user = await User.create({
      name: "Ravi Kumar",
      email: `ravi.${Date.now()}@example.com`,
      password: "pass123",
      role: "user",
    });

    const driver = await User.create({
      name: "Anita Singh",
      email: `anita.${Date.now()}@example.com`,
      password: "pass123",
      role: "driver",
    });

    const request = await Request.create({
      userId: user._id,
      pickup: "Sector 21",
      drop: "City Center",
      weight: 12.5,
      date: new Date("2026-04-25"),
    });

    const listing = await DriverListing.create({
      driverId: driver._id,
      from: "Sector 20",
      to: "City Center",
      capacity: 30,
      date: new Date("2026-04-25"),
    });

    const match = await Match.create({
      requestId: request._id,
      driverId: driver._id,
    });

    console.log("Inserted documents:");
    console.log({ userId: user._id, driverId: driver._id, requestId: request._id, listingId: listing._id, matchId: match._id });
    console.log("Collections created and verified.");
  } catch (error) {
    console.error("Model test failed:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();
