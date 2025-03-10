const Kithkin = require("../models/kithkinModel");

exports.getAll = async (req, res) => {
  try {
    const data = await Kithkin.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Kithkin.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByStatus = async (req, res) => {
  try {
    const data = await Kithkin.getByStatus(req.params.status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const pdfFilePath = req.file
      ? `/uploads/kithkin/${req.file.filename}`
      : null;
    const newRecord = { ...req.body, pdf_file: pdfFilePath };
    await Kithkin.create(newRecord);

    res.status(201).json({
      message: "Kithkin record created successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pdfFilePath = req.file
      ? `/uploads/kithkin/${req.file.filename}`
      : null;
    const updatedData = { ...req.body, pdf_file: pdfFilePath };
    await Kithkin.update(id, updatedData);

    res.json({
      message: "Kithkin record updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Call the model method to update the status only
    await Kithkin.updateStatus(id, status);

    res.json({
      status: "success",
      message: "Kithkin status updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "error", error: err.message });
  }
};

exports.updateRemarks = async (req, res) => {
  try {
    const { remarks, status } = req.body;
    const id = req.params.id;

    if (!remarks || !status) {
      return res
        .status(400)
        .json({ message: "Remarks and status are required" });
    }

    // Call the model method to update both remarks and status
    await Kithkin.updateRemarks(id, remarks, status);

    res.json({
      status: "success",
      message: "Kithkin remarks and status updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "error", error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Kithkin.delete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
