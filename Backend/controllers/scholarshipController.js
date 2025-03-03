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
  updatestatus,
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

// exports.createScholarship = async (req, res) => {
//   upload.single("pdf")(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }

//     try {
//       // Handle the file upload, get the file path if a file is uploaded
//       const filePath = req.file
//         ? `uploads/scholarships/${req.file.filename}`
//         : null;

//       // Call the createScholarship function from your service logic
//       await createScholarship(res, req.body, filePath);

//       // Send a success response back to the frontend
//       return res.status(201).json({
//         message: "Scholarship entry created successfully",
//         status: "success",
//         data: req.body, // You can send the data back if needed for confirmation
//       });
//     } catch (error) {
//       // If there's an error in the process, send the error message back to the frontend
//       console.error(error); // Optional: log the error for debugging

//       // Handle the scholarship creation failure, return an error response
//       return res.status(500).json({
//         message: "Server error occurred while creating scholarship",
//         status: "error",
//         error: error.message,
//       });
//     }
//   });
// };

exports.createScholarship = async (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "File upload failed. Please check the file and try again.",
      });
    }

    try {
      const filePath = req.file
        ? `uploads/scholarships/${req.file.filename}`
        : null;

      // Call the createScholarship function
      await createScholarship(req.body, filePath);

      // Send success response once the scholarship is created
      return res.status(201).json({
        message: "Scholarship entry created successfully",
        status: "success",
        data: req.body,
      });
    } catch (error) {
      // console.error("Error in scholarship creation:", error.message); // Log the detailed error

      return res.status(500).json({
        message: `Error in scholarship creation:${error.message} `, // Send a generic error message to the frontend
        status: "error",
      });
    }
  });
};

//Update Scholarship

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

//update by status

exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
      res
        .status(400)
        .json({ status: "success", message: "Status is required" });
    }
    await updatestatus(id, status);
    res.json({ message: "scholarship status updated successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
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
