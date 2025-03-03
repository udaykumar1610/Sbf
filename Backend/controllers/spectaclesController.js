const Spectacles = require("../models/spectaclesModel");

// Get all records
exports.getAll = async (req, res) => {
  try {
    const data = await Spectacles.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const data = await Spectacles.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by Status
exports.getByStatus = async (req, res) => {
  try {
    const data = await Spectacles.getByStatus(req.params.status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new record
exports.create = async (req, res) => {
  try {
    const pdfFilePath = req.file
      ? `/uploads/spectacles/${req.file.filename}`
      : null;
    const newRecord = { ...req.body, pdf_file: pdfFilePath };
    await Spectacles.create(newRecord);

    // res.status(201).json({ message: "Spectacles record created successfully" });
    res.status(201).json({
      status: "success",
      message: "Spectacles record created successfully",
    });
  } catch (err) {
    // res.status(500).json({ error: err.message });
    res.status(500).json({ status: "error", error: err.message });
    console.log({ error: err.message });
  }
};

// Update spectacles record
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pdfFilePath = req.file
      ? `/uploads/spectacles/${req.file.filename}`
      : null;
    const updatedData = { ...req.body, pdf_file: pdfFilePath };
    await Spectacles.update(id, updatedData);

    res.json({ message: "Spectacles record updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete record
exports.delete = async (req, res) => {
  try {
    await Spectacles.delete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
