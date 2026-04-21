const express = require("express");
const {
  findMatchesByRequest,
  createMatch,
} = require("../controllers/match.controller");

const router = express.Router();

router.get("/:requestId", findMatchesByRequest);
router.post("/", createMatch);

module.exports = router;
