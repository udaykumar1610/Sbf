const express = require("express");
const { getUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:id", protect, getUser);

module.exports = router;
