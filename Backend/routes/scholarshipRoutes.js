const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createScholarship,
  getAllScholarships,
  getScholarshipById,
  getScholarshipsByStatus,
  updateScholarship,
  updateStatus,
  updateRemarks,
  deleteScholarship,
} = require("../controllers/scholarshipController");

const router = express.Router();

router.post("/", protect, createScholarship);
router.get("/", protect, getAllScholarships);
router.get("/:id", protect, getScholarshipById);
router.get("/status/:status", protect, getScholarshipsByStatus);
router.put("/:id", protect, updateScholarship);
router.put("/status/:id", protect, updateStatus);
router.put("/remarks/:id", protect, updateRemarks);
router.delete("/:id", protect, deleteScholarship);

module.exports = router;
