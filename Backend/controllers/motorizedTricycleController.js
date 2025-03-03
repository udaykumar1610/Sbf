const MotorizedTricycle = require("../models/motorizedTricycleModel");

// Get all records
exports.getAll = async (req, res) => {
  try {
    const data = await MotorizedTricycle.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const data = await MotorizedTricycle.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by Status
exports.getByStatus = async (req, res) => {
  try {
    const data = await MotorizedTricycle.getByStatus(req.params.status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new record
exports.create = async (req, res) => {
  try {
    const pdfFilePath = req.file
      ? `/uploads/motorizedtricycle/${req.file.filename}`
      : null;
    const newRecord = { ...req.body, pdf_file: pdfFilePath };
    await MotorizedTricycle.create(newRecord);

    res.status(201).json({
      status: "success",
      message: "Motorized Tricycle record created successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Update record
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pdfFilePath = req.file
      ? `/uploads/motorizedtricycle/${req.file.filename}`
      : null;
    const updatedData = { ...req.body, pdf_file: pdfFilePath };
    await MotorizedTricycle.update(id, updatedData);

    res.json({ message: "Motorized Tricycle record updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete record
exports.delete = async (req, res) => {
  try {
    await MotorizedTricycle.delete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
