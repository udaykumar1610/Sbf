const DeafAndMentallyRetarded = require("../models/deafMentalModel");

exports.getAll = async (req, res) => {
  try {
    const data = await DeafAndMentallyRetarded.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await DeafAndMentallyRetarded.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByStatus = async (req, res) => {
  try {
    const data = await DeafAndMentallyRetarded.getByStatus(req.params.status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const pdfFilePath = req.file
      ? `/uploads/deafmentaly/${req.file.filename}`
      : null;
    const newRecord = { ...req.body, pdf_file: pdfFilePath };
    await DeafAndMentallyRetarded.create(newRecord);

    res.status(201).json({
      message: "Deaf and Mentally Retarded record created successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pdfFilePath = req.file
      ? `/uploads/deafmentaly/${req.file.filename}`
      : null;
    const updatedData = { ...req.body, pdf_file: pdfFilePath };
    await DeafAndMentallyRetarded.update(id, updatedData);

    res.json({
      message: "Deaf and Mentally Retarded record updated successfully",
    });
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
    await DeafAndMentallyRetarded.updateStatus(id, status);
    res.json({
      message: "Deaf and Mentally Retarded status updated successfully",
    });
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
    await DeafAndMentallyRetarded.updateRemarks(id, status, remarks);
    res.json({
      message:
        "Deaf and Mentally Retarded remarks and  status updated successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await DeafAndMentallyRetarded.delete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
