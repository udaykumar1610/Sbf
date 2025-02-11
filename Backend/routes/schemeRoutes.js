// const express = require("express");
// const { protect } = require("../middlewares/authMiddleware");
// const {
//   createScheme,
//   getSchemes,
//   getSchemeById,
//   updateScheme,
//   deleteScheme,
// } = require("../controllers/schemeController");

// const router = express.Router();

// router.post("/", protect, createScheme); // Create scheme
// router.get("/", getSchemes); // Get all schemes
// router.get("/:id", getSchemeById); // Get single scheme
// router.put("/:id", protect, updateScheme); // Update scheme
// router.delete("/:id", protect, deleteScheme); // Delete scheme

// module.exports = router;

const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createScheme,
  getSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
  getSchemesname,
} = require("../controllers/schemeController");

const router = express.Router();

router.post("/", protect, createScheme); // Create scheme
router.get("/", getSchemes); // Get all schemes
router.get("/names", getSchemesname); // Get all schemesnames
router.get("/:id", getSchemeById); // Get single scheme
router.put("/:id", protect, updateScheme); // Update scheme
router.delete("/:id", protect, deleteScheme); // Delete scheme

module.exports = router;
