const express = require("express");
const {
  createRequest,
  getAllRequests,
  getRequestsByUser,
  deleteRequest,
} = require("../controllers/request.controller");

const router = express.Router();

router.post("/", createRequest);
router.get("/", getAllRequests);
router.get("/user/:userId", getRequestsByUser);
router.delete("/:id", deleteRequest);

module.exports = router;
