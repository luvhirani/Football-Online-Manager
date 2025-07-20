const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getMyTeam } = require("../controllers/teamController");

router.get("/my-team", authMiddleware, getMyTeam);

module.exports = router;
