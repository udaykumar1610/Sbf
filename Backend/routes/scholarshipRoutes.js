const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createScholarship,
  getAllScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
} = require("../controllers/scholarshipController");

const router = express.Router();

router.post("/", protect, createScholarship);
router.get("/", protect, getAllScholarships);
router.get("/:id", protect, getScholarshipById);
router.put("/:id", protect, updateScholarship);
router.delete("/:id", protect, deleteScholarship);

module.exports = router;
