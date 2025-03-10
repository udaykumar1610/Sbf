const MedicalAssistance = require("../models/medicalAssistanceModel");

// Get all records
exports.getAll = async (req, res) => {
  try {
    const data = await MedicalAssistance.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const data = await MedicalAssistance.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by Status
exports.getByStatus = async (req, res) => {
  try {
    const data = await MedicalAssistance.getByStatus(req.params.status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new record
// Create new medical assistance record
exports.create = async (req, res) => {
  try {
    const pdfFilePath = req.file
      ? `/uploads/medical/${req.file.filename}`
      : null;
    const newRecord = { ...req.body, pdfFile: pdfFilePath };
    await MedicalAssistance.create(newRecord);

    res
      .status(201)
      .json({ message: "Medical Assistance record created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update medical assistance record
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pdfFilePath = req.file
      ? `/uploads/medical/${req.file.filename}`
      : null;
    const updatedData = { ...req.body, pdfFile: pdfFilePath };
    await MedicalAssistance.update(id, updatedData);

    res.json({ message: "Medical Assistance record updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ status: "error", message: "Status is required" });
    }
    await MedicalAssistance.updateStatus(id, status);
    res.json({ message: "Medical Assistance status updated successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

exports.updateRemarks = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, remarks } = req.body;

    if (!status || !remarks) {
      res
        .status(400)
        .json({ status: "error", message: "Remarks and Status is required" });
    }
    await MedicalAssistance.updateRemarks(id, status, remarks);
    res.json({
      message: "Medical Assistance remarks and  status updated successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

// Delete record
exports.delete = async (req, res) => {
  try {
    await MedicalAssistance.delete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
