const express = require("express");
const {
  getUser,
  update_User,
  getUserByHrmsId,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { getAllUsers } = require("../controllers/adminController");
const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUser);
router.put("/:id", update_User);

router.get("/hrms/:hrms_id", protect, getUserByHrmsId);

module.exports = router;
