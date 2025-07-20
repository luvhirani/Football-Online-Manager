const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getTransferList,
  listPlayer,
  unlistPlayer,
  buyPlayer,
} = require("../controllers/transferController");

router.get("/list", authMiddleware, getTransferList);
router.post("/list-player", authMiddleware, listPlayer);
router.post("/unlist-player", authMiddleware, unlistPlayer);
router.post("/buy-player", authMiddleware, buyPlayer);

module.exports = router;
