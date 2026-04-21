const mongoose = require("mongoose");
const Request = require("../models/request.model");

const createRequest = async (req, res) => {
  try {
    const { userId, pickup, drop, weight, date } = req.body;

    if (!userId || !pickup || !drop || weight === undefined || !date) {
      return res.status(400).json({
        success: false,
        message: "userId, pickup, drop, weight, and date are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format.",
      });
    }

    const newRequest = await Request.create({
      userId,
      pickup,
      drop,
      weight,
      date,
    });

    return res.status(201).json({
      success: true,
      data: newRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create request.",
    });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch requests.",
    });
  }
};

const getRequestsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId format.",
      });
    }

    const requests = await Request.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user requests.",
    });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request id format.",
      });
    }

    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete request.",
    });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestsByUser,
  deleteRequest,
};
