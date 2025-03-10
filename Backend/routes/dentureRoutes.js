const express = require("express");
const router = express.Router();
const multer = require("multer");
const denturesController = require("../controllers/dentureController");
const { protect } = require("../middlewares/authMiddleware");

// Multer configuration for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/dentures/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// Routes
router.get("/", protect, denturesController.getAllDentures);
router.get("/", protect, denturesController.getAllDentures);
router.get("/status/:status", protect, denturesController.getDenturesByStatus);
router.get("/:id", protect, denturesController.getDentureById);
router.post(
  "/",
  protect,
  upload.single("pdfFile"),
  denturesController.createDenture
);
router.put("/:id", protect, denturesController.updateDenture);
router.put("/status/:id", protect, denturesController.updateStatus);
router.put("/remarks/:id", protect, denturesController.updateRemarks);
router.delete("/:id", protect, denturesController.deleteDenture);

module.exports = router;
