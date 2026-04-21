const mongoose = require("mongoose");
const Request = require("../models/request.model");
const DriverListing = require("../models/driverListing.model");
const Match = require("../models/match.model");

const findMatchesByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid requestId format.",
      });
    }

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    const requestDate = new Date(request.date);
    requestDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(requestDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const pickupLower = request.pickup.toLowerCase();
    const dropLower = request.drop.toLowerCase();

    const matches = await DriverListing.aggregate([
      {
        $match: {
          date: { $gte: requestDate, $lt: nextDate },
          capacity: { $gte: request.weight },
        },
      },
      {
        $addFields: {
          fromLower: { $toLower: "$from" },
          toLower: { $toLower: "$to" },
        },
      },
      {
        $match: {
          fromLower: { $regex: pickupLower },
          toLower: { $regex: dropLower },
        },
      },
      {
        $project: {
          fromLower: 0,
          toLower: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to find matches.",
    });
  }
};

const createMatch = async (req, res) => {
  try {
    const { requestId, driverId } = req.body;

    if (!requestId || !driverId) {
      return res.status(400).json({
        success: false,
        message: "requestId and driverId are required.",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(requestId) ||
      !mongoose.Types.ObjectId.isValid(driverId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid requestId or driverId format.",
      });
    }

    const match = await Match.create({
      requestId,
      driverId,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      data: match,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create match.",
    });
  }
};

module.exports = {
  findMatchesByRequest,
  createMatch,
};
