const pool = require("../config/db");

const createUser = async (umid, email, password, role) => {
  const [result] = await pool.query(
    "INSERT INTO users (umid, email, password, role) VALUES (?, ?, ?, ?)",
    [umid, email, password, role]
  );
  return result;
};

// Fetch user by either UMID or email
const findUserByUmidOrEmail = async (identifier) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE umid = ? OR email = ?",
    [identifier, identifier]
  );
  return rows[0];
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  deleteUser,
  findUserByUmidOrEmail,
};
