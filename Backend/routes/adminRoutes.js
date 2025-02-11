const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminController"); // ✅ Correct Import
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", protect, getAllUsers); // ✅ Ensure function exists
router.delete("/:id", deleteUser); // ✅ Ensure function exists

module.exports = router;
