const {
  createScheme,
  getAllSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
} = require("../models/schemeModel");

// Create a new scheme
exports.createScheme = async (req, res) => {
  try {
    const { title, valid_upto, scheme_details, beneficiaries_details } =
      req.body;
    await createScheme(
      title,
      valid_upto,
      scheme_details,
      beneficiaries_details
    );
    res.status(201).json({ message: "Scheme created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all schemes
exports.getSchemes = async (req, res) => {
  try {
    const schemes = await getAllSchemes();
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single scheme by ID
exports.getSchemeById = async (req, res) => {
  try {
    const scheme = await getSchemeById(req.params.id);
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a scheme
exports.updateScheme = async (req, res) => {
  try {
    const { title, valid_upto, scheme_details, beneficiaries_details } =
      req.body;
    await updateScheme(
      req.params.id,
      title,
      valid_upto,
      scheme_details,
      beneficiaries_details
    );
    res.json({ message: "Scheme updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a scheme
exports.deleteScheme = async (req, res) => {
  try {
    await deleteScheme(req.params.id);
    res.json({ message: "Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
