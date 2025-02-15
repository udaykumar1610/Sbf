const MaintenanceGrant = require("../models/maintenanceGrantModel");

// Get all records
exports.getAll = async (req, res) => {
  try {
    const data = await MaintenanceGrant.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const data = await MaintenanceGrant.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by Status
exports.getByStatus = async (req, res) => {
  try {
    const data = await MaintenanceGrant.getByStatus(req.params.status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new record
exports.create = async (req, res) => {
  try {
    const pdfFilePath = req.file
      ? `/uploads/maintenanceGrant/${req.file.filename}`
      : null;
    const newRecord = { ...req.body, pdf_file: pdfFilePath };
    await MaintenanceGrant.create(newRecord);

    res
      .status(201)
      .json({ message: "Maintenance Grant record created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update record
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pdfFilePath = req.file
      ? `/uploads/maintenanceGrant/${req.file.filename}`
      : null;
    const updatedData = { ...req.body, pdf_file: pdfFilePath };
    await MaintenanceGrant.update(id, updatedData);

    res.json({ message: "Maintenance Grant record updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete record
exports.delete = async (req, res) => {
  try {
    await MaintenanceGrant.delete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
