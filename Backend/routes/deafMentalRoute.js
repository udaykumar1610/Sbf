const express = require("express");
const multer = require("multer");
const controller = require("../controllers/deafMentalController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/deafmentaly/");
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

router.get("/", protect, controller.getAll);
router.get("/:id", protect, controller.getById);
router.get("/status/:status", protect, controller.getByStatus);
router.post("/", protect, upload.single("pdf_file"), controller.create);
router.put("/:id", protect, upload.single("pdf_file"), controller.update);
router.delete("/:id", protect, controller.delete);

module.exports = router;
