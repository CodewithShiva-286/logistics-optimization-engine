const mongoose = require("mongoose");
const DriverListing = require("../models/driverListing.model");

const createDriverRoute = async (req, res) => {
  try {
    const { driverId, from, to, capacity, date } = req.body;

    if (!driverId || !from || !to || capacity === undefined || !date) {
      return res.status(400).json({
        success: false,
        message: "driverId, from, to, capacity, and date are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid driverId format.",
      });
    }

    const driverRoute = await DriverListing.create({
      driverId,
      from,
      to,
      capacity,
      date,
    });

    return res.status(201).json({
      success: true,
      data: driverRoute,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create driver route.",
    });
  }
};

const getAllDriverRoutes = async (req, res) => {
  try {
    const routes = await DriverListing.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: routes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch driver routes.",
    });
  }
};

const getRoutesByDriver = async (req, res) => {
  try {
    const { driverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid driverId format.",
      });
    }

    const routes = await DriverListing.find({ driverId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: routes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch driver routes by driver.",
    });
  }
};

const deleteDriverRoute = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid route id format.",
      });
    }

    const deletedRoute = await DriverListing.findByIdAndDelete(id);

    if (!deletedRoute) {
      return res.status(404).json({
        success: false,
        message: "Driver route not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedRoute,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete driver route.",
    });
  }
};

module.exports = {
  createDriverRoute,
  getAllDriverRoutes,
  getRoutesByDriver,
  deleteDriverRoute,
};
