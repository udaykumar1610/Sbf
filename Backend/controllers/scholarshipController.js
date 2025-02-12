// const path = require("path");
// const multer = require("multer");
// const {
//   createScholarship,
//   getAllScholarships,
//   getScholarshipById,
//   updateScholarship,
//   deleteScholarship,
// } = require("../models/scholarshipModel");

// // Configure Multer for PDF uploads (Max: 5MB)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/scholarships/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max size: 5MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDFs are allowed!"));
//     }
//   },
// });

// // Create Scholarship
// exports.createScholarship = async (req, res) => {
//   upload.single("pdf")(req, res, async (err) => {
//     if (err) return res.status(400).json({ message: err.message });

//     try {
//       const filePath = req.file
//         ? `uploads/scholarships/${req.file.filename}`
//         : null;
//       await createScholarship(req.body, filePath);
//       res
//         .status(201)
//         .json({ message: "Scholarship entry created successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   });
// };

// // Update Scholarship
// exports.updateScholarship = async (req, res) => {
//   upload.single("pdf")(req, res, async (err) => {
//     if (err) return res.status(400).json({ message: err.message });

//     try {
//       const filePath = req.file
//         ? `uploads/scholarships/${req.file.filename}`
//         : null;
//       await updateScholarship(req.params.id, req.body, filePath);
//       res.json({ message: "Scholarship updated successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   });
// };

// // Get all scholarships
// exports.getAllScholarships = async (req, res) => {
//   try {
//     const scholarships = await getAllScholarships();
//     res.json(scholarships);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get scholarship by ID
// exports.getScholarshipById = async (req, res) => {
//   try {
//     const scholarship = await getScholarshipById(req.params.id);
//     if (!scholarship)
//       return res.status(404).json({ message: "Scholarship not found" });
//     res.json(scholarship);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Update scholarship
// exports.updateScholarship = async (req, res) => {
//   try {
//     await updateScholarship(req.params.id, req.body);
//     res.json({ message: "Scholarship updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Delete scholarship
// exports.deleteScholarship = async (req, res) => {
//   try {
//     await deleteScholarship(req.params.id);
//     res.json({ message: "Scholarship deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

const path = require("path");
const multer = require("multer");
const {
  createScholarship,
  getAllScholarships,
  getScholarshipById,
  getScholarshipsByStatus,
  updateScholarship,
  deleteScholarship,
} = require("../models/scholarshipModel");

// Configure Multer for PDF uploads (Max: 5MB)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/scholarships/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max size: 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs are allowed!"));
    }
  },
});

// Create Scholarship
exports.createScholarship = async (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const filePath = req.file
        ? `uploads/scholarships/${req.file.filename}`
        : null;
      await createScholarship(req.body, filePath);
      res
        .status(201)
        .json({ message: "Scholarship entry created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

// Update Scholarship
exports.updateScholarship = async (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const filePath = req.file
        ? `uploads/scholarships/${req.file.filename}`
        : null;
      await updateScholarship(req.params.id, req.body, filePath);
      res.json({ message: "Scholarship updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

// Get all scholarships
exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await getAllScholarships();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get scholarship by ID
exports.getScholarshipById = async (req, res) => {
  try {
    const scholarship = await getScholarshipById(req.params.id);
    if (!scholarship)
      return res.status(404).json({ message: "Scholarship not found" });
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get scholarships by status
exports.getScholarshipsByStatus = async (req, res) => {
  try {
    const scholarships = await getScholarshipsByStatus(req.params.status);
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update scholarship
exports.updateScholarship = async (req, res) => {
  try {
    await updateScholarship(req.params.id, req.body);
    res.json({ message: "Scholarship updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete scholarship
exports.deleteScholarship = async (req, res) => {
  try {
    await deleteScholarship(req.params.id);
    res.json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
