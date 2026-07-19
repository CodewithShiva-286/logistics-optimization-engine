require("dotenv").config();
const app = require("../backend/src/app");
const connectDB = require("../backend/src/config/db");

// Connect to database
connectDB().catch(error => {
  console.error("Failed to connect to MongoDB:", error.message);
});

module.exports = app;
