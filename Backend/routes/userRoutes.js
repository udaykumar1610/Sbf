const express = require("express");
const {
  getUser,
  update_User,
  getUserId,
  getUserByHrmsId,
  deleteFamilyData,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { getAllUsers } = require("../controllers/adminController");
const { getUserById } = require("../models/userModel");
const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/getall/:id", protect, getUserId);
router.get("/:id", protect, getUser);
router.put("/:id", protect, update_User);
router.delete("/:id", protect, deleteFamilyData);

router.get("/hrms/:hrms_id", protect, getUserByHrmsId);

module.exports = router;
