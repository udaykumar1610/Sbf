const pool = require("../config/db");

// Create a new scheme
const createScheme = async (
  title,
  valid_upto,
  scheme_details,
  beneficiaries_details
) => {
  await pool.query(
    "INSERT INTO schemes (title, valid_upto, scheme_details, beneficiaries_details) VALUES (?, ?, ?, ?)",
    [title, valid_upto, scheme_details, beneficiaries_details]
  );
};

// Get all schemes
const getAllSchemes = async () => {
  const [schemes] = await pool.query("SELECT * FROM schemes");
  return schemes;
};

// Get a single scheme by ID
const getSchemeById = async (id) => {
  const [scheme] = await pool.query("SELECT * FROM schemes WHERE id = ?", [id]);
  return scheme.length ? scheme[0] : null;
};

// Update a scheme by ID
const updateScheme = async (
  id,
  title,
  valid_upto,
  scheme_details,
  beneficiaries_details
) => {
  await pool.query(
    "UPDATE schemes SET title = ?, valid_upto = ?, scheme_details = ?, beneficiaries_details = ? WHERE id = ?",
    [title, valid_upto, scheme_details, beneficiaries_details, id]
  );
};

// Delete a scheme by ID
const deleteScheme = async (id) => {
  await pool.query("DELETE FROM schemes WHERE id = ?", [id]);
};

module.exports = {
  createScheme,
  getAllSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
};
