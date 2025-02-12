const {
  createDenture,
  getAllDentures,
  getDentureById,
  updateDenture,
  deleteDenture,
} = require("../models/dentureModel");

// Create a new denture claim
exports.createDenture = async (req, res) => {
  try {
    await createDenture(req.body);
    res.status(201).json({ message: "Denture claim created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all denture claims
exports.getAllDentures = async (req, res) => {
  try {
    const dentures = await getAllDentures();
    res.json(dentures);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get denture claim by ID
exports.getDentureById = async (req, res) => {
  try {
    const denture = await getDentureById(req.params.id);
    if (!denture)
      return res.status(404).json({ message: "Denture claim not found" });
    res.json(denture);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update denture claim
exports.updateDenture = async (req, res) => {
  try {
    await updateDenture(req.params.id, req.body);
    res.json({ message: "Denture claim updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete denture claim
exports.deleteDenture = async (req, res) => {
  try {
    await deleteDenture(req.params.id);
    res.json({ message: "Denture claim deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
