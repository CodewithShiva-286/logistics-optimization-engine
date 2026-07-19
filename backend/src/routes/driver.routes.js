const express = require("express");
const {
  createDriverRoute,
  getAllDriverRoutes,
  getRoutesByDriver,
  deleteDriverRoute,
} = require("../controllers/driver.controller");

const router = express.Router();

router.post("/", createDriverRoute);
router.get("/", getAllDriverRoutes);
router.get("/:driverId", getRoutesByDriver);
router.delete("/:id", deleteDriverRoute);

module.exports = router;
