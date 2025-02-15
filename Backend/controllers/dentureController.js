const Dentures = require("../models/dentureModel");
const path = require("path");
const fs = require("fs");

// Get all dentures
const getAllDentures = async (req, res) => {
  try {
    const [rows] = await Dentures.getAllDentures();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get dentures by status
const getDenturesByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const [rows] = await Dentures.getDenturesByStatus(status);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single denture by ID
const getDentureById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await Dentures.getDentureById(id);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createDenture = async (req, res) => {
  try {
    const pdfFile = req.file;
    if (!pdfFile) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const pdfFilePath = `/uploads/dentures/${pdfFile.filename}`;
    const newDenture = { ...req.body, pdfFilePath }; // Include other data as needed
    await Dentures.createDenture(newDenture);

    res.status(201).json({ message: "Denture created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update denture
const updateDenture = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    await Dentures.updateDenture(id, updatedData);
    res.json({ message: "Denture updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete denture
const deleteDenture = async (req, res) => {
  try {
    const id = req.params.id;
    await Dentures.deleteDenture(id);
    res.json({ message: "Denture deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDentures,
  getDenturesByStatus,
  getDentureById,
  createDenture,
  updateDenture,
  deleteDenture,
};
