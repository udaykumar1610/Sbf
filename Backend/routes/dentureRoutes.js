const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createDenture,
  getAllDentures,
  getDentureById,
  updateDenture,
  deleteDenture,
} = require("../controllers/dentureController");

const router = express.Router();

router.post("/", protect, createDenture);
router.get("/", protect, getAllDentures);
router.get("/:id", protect, getDentureById);
router.put("/:id", protect, updateDenture);
router.delete("/:id", protect, deleteDenture);

module.exports = router;
