const {
  createScholarship,
  getAllScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
} = require("../models/scholarshipModel");

// Create a new scholarship
exports.createScholarship = async (req, res) => {
  try {
    await createScholarship(req.body);
    res.status(201).json({ message: "Scholarship entry created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
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
