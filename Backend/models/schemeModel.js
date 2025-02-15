const pool = require("../config/db");

// Create a new scheme
const createScheme = async (
  scheme_name,
  scheme_details,
  eligibility,
  eligibility_amount,
  valid_upto
) => {
  await pool.query(
    "INSERT INTO schemes (scheme_name, scheme_details, eligibility, eligibility_amount, valid_upto) VALUES (?, ?, ?, ?, ?)",
    [scheme_name, scheme_details, eligibility, eligibility_amount, valid_upto]
  );
};

// Get all schemes
const getAllSchemes = async () => {
  const [schemes] = await pool.query("SELECT * FROM schemes");
  return schemes;
};

const getSchemesnames = async () => {
  const [schemes] = await pool.query(
    "SELECT distinct scheme_name  FROM schemes"
  );
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
  scheme_name,
  scheme_details,
  eligibility,
  eligibility_amount,
  valid_upto
) => {
  await pool.query(
    "UPDATE schemes SET scheme_name = ?, scheme_details = ?, eligibility = ?, eligibility_amount = ?, valid_upto = ? WHERE id = ?",
    [
      scheme_name,
      scheme_details,
      eligibility,
      eligibility_amount,
      valid_upto,
      id,
    ]
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
  getSchemesnames,
};
