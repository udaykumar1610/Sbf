const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminController"); // ✅ Correct Import
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers); // ✅ Ensure function exists
router.delete("/:id", protect, adminOnly, deleteUser); // ✅ Ensure function exists

module.exports = router;
