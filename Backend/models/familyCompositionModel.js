const db = require("../config/db");

// Create FamilyComposition record
const createFamilyComposition = (data, callback) => {
  const sql = `
    INSERT INTO FamilyComposition SET ?
  `;
  db.query(sql, data, callback);
};

// Get FamilyComposition by FamilyDetails ID
const getFamilyCompositionByFamilyId = (familyId, callback) => {
  const sql = `
    SELECT * FROM FamilyComposition WHERE comp_id = ?
  `;
  db.query(sql, [familyId], callback);
};

module.exports = {
  createFamilyComposition,
  getFamilyCompositionByFamilyId,
};
