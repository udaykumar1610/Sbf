const db = require("../config/db");

// Get all dentures
const getAllDentures = () => {
  return db.query("SELECT * FROM Dentures");
};

// Get dentures by status
const getDenturesByStatus = (status) => {
  return db.query("SELECT * FROM Dentures WHERE status = ?", [status]);
};

// Get single denture
const getDentureById = (id) => {
  return db.query("SELECT * FROM Dentures WHERE id = ?", [id]);
};

// Create new denture
const createDenture = (dentureData) => {
  return db.query("INSERT INTO Dentures SET ?", dentureData);
};

// Update denture
const updateDenture = (id, updatedData) => {
  return db.query("UPDATE Dentures SET ? WHERE id = ?", [updatedData, id]);
};

// Delete denture
const deleteDenture = (id) => {
  return db.query("DELETE FROM Dentures WHERE id = ?", [id]);
};

module.exports = {
  getAllDentures,
  getDenturesByStatus,
  getDentureById,
  createDenture,
  updateDenture,
  deleteDenture,
};
