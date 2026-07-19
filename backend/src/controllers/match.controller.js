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

    const pickupValue = String(request.pickupCity || request.pickup || "").toLowerCase();
    const dropValue = String(request.dropCity || request.drop || "").toLowerCase();

    if (!pickupValue || !dropValue) {
      return res.status(400).json({
        success: false,
        message: "Request is missing pickup or drop city data.",
      });
    }

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
          fromLower: { $regex: pickupValue },
          toLower: { $regex: dropValue },
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

    const existingMatch = await Match.findOne({ requestId, driverId }).sort({
      createdAt: -1,
    });

    if (existingMatch) {
      return res.status(200).json({
        success: true,
        data: existingMatch,
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

const acceptMatch = async (req, res) => {
  try {
    const { matchId } = req.body;

    if (!matchId) {
      return res.status(400).json({
        success: false,
        message: "matchId is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(matchId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid matchId format.",
      });
    }

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found.",
      });
    }

    if (match.status === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Match is already accepted.",
      });
    }

    if (match.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Rejected match cannot be accepted.",
      });
    }

    match.status = "accepted";
    await match.save();

    await Request.findByIdAndUpdate(match.requestId, { status: "matched" });

    return res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to accept match.",
    });
  }
};

const rejectMatch = async (req, res) => {
  try {
    const { matchId } = req.body;

    if (!matchId) {
      return res.status(400).json({
        success: false,
        message: "matchId is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(matchId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid matchId format.",
      });
    }

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found.",
      });
    }

    if (match.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Match is already rejected.",
      });
    }

    if (match.status === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Accepted match cannot be rejected.",
      });
    }

    match.status = "rejected";
    await match.save();

    return res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reject match.",
    });
  }
};

module.exports = {
  findMatchesByRequest,
  createMatch,
  acceptMatch,
  rejectMatch,
};
