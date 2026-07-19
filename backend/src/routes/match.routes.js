const express = require("express");
const {
  findMatchesByRequest,
  createMatch,
  acceptMatch,
  rejectMatch,
} = require("../controllers/match.controller");

const router = express.Router();

router.get("/:requestId", findMatchesByRequest);
router.post("/", createMatch);
router.post("/accept", acceptMatch);
router.post("/reject", rejectMatch);

module.exports = router;
