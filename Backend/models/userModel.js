// const pool = require("../config/db");

// // Create a new user
// const createUser = async (userData) => {
//   const {
//     empname,
//     email,
//     password,
//     designation,
//     date_of_birth,
//     date_of_appointment,
//     mobilenumber,
//     pf_no,
//     hrms_id,
//     division,
//     office,
//     level,
//     role,
//   } = userData;

//   const [result] = await pool.query(
//     "INSERT INTO users (empname, email, password, designation, date_of_birth, date_of_appointment, mobilenumber, pf_no, hrms_id, division, office, level, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//     [
//       empname,
//       email,
//       password,
//       designation,
//       date_of_birth,
//       date_of_appointment,
//       mobilenumber,
//       pf_no,
//       hrms_id,
//       division,
//       office,
//       level,
//       role,
//     ]
//   );

//   return result;
// };

// // Fetch user by HRMS ID
// const findUserByHrmsId = async (hrms_id) => {
//   const [rows] = await pool.query("SELECT * FROM users WHERE hrms_id = ?", [
//     hrms_id,
//   ]);
//   return rows[0];
// };

// // Fetch user by Email
// const findUserByEmail = async (email) => {
//   const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
//     email,
//   ]);
//   return rows[0];
// };

// // Fetch user by ID
// const findUserById = async (id) => {
//   const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
//   return rows[0];
// };

// // Get all users (for admin)
// const getAllUsers = async () => {
//   const [rows] = await pool.query("SELECT * FROM users");
//   return rows;
// };

// // Delete user
// const deleteUser = async (id) => {
//   await pool.query("DELETE FROM users WHERE id = ?", [id]);
// };

// // Update user details
// const updateUser = async (id, userData) => {
//   const {
//     empname,
//     email,
//     designation,
//     date_of_birth,
//     date_of_appointment,
//     mobilenumber,
//     pf_no,
//     hrms_id,
//     division,
//     office,
//     level,
//   } = userData;

//   await pool.query(
//     "UPDATE users SET empname=?, email=?, designation=?, date_of_birth=?, date_of_appointment=?, mobilenumber=?, pf_no=?, hrms_id=?, division=?, office=?, level=? WHERE id=?",
//     [
//       empname,
//       email,
//       designation,
//       date_of_birth,
//       date_of_appointment,
//       mobilenumber,
//       pf_no,
//       hrms_id,
//       division,
//       office,
//       level,
//       id,
//     ]
//   );
// };

// module.exports = {
//   createUser,
//   findUserByHrmsId,
//   findUserByEmail,
//   findUserById,
//   getAllUsers,
//   deleteUser,
//   updateUser,
// };

const pool = require("../config/db");

// Create a new user
const createUser = async (userData) => {
  const {
    empname,
    email,
    password,
    designation,
    date_of_birth,
    date_of_appointment,
    mobilenumber,
    pf_no,
    hrms_id,
    division,
    office,
    level,
    role,
    payband, // Added payband
  } = userData;

  const [result] = await pool.query(
    "INSERT INTO users (empname, email, password, designation, date_of_birth, date_of_appointment, mobilenumber, pf_no, hrms_id, division, office, level, role, payband) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", // Added payband in query
    [
      empname,
      email,
      password,
      designation,
      date_of_birth,
      date_of_appointment,
      mobilenumber,
      pf_no,
      hrms_id,
      division,
      office,
      level,
      role,
      payband, // Added payband to the array
    ]
  );

  return result;
};

// Fetch user by HRMS ID
// const findUserByHrmsId = async (hrms_id) => {
//   const [rows] = await pool.query("SELECT * FROM users WHERE hrms_id = ?", [
//     hrms_id,
//   ]);
//   return rows[0];
// };

// Modified findUserByHrmsId for case-insensitive query
const findUserByHrmsId = async (hrms_id) => {
  // console.log("Fetching user with HRMS ID:", hrms_id);
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE LOWER(hrms_id) = LOWER(?)",
    [hrms_id]
  );
  // console.log("Database query result:", rows);
  return rows[0]; // Return the first matching user, or undefined if no user is found
};
// Fetch user by Email
const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

// Fetch user by ID
const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ? ", [id]);
  return rows[0];
};

// Get all users (for admin)
const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

// Delete user
const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
};

// Update user details
const updateUser = async (id, userData) => {
  const {
    empname,
    email,
    designation,
    date_of_birth,
    date_of_appointment,
    mobilenumber,
    pf_no,
    hrms_id,
    division,
    office,
    level,
    payband, // Added payband
  } = userData;

  await pool.query(
    "UPDATE users SET empname=?, email=?, designation=?, date_of_birth=?, date_of_appointment=?, mobilenumber=?, pf_no=?, hrms_id=?, division=?, office=?, level=?, payband=? WHERE id=?", // Included payband in query
    [
      empname,
      email,
      designation,
      date_of_birth,
      date_of_appointment,
      mobilenumber,
      pf_no,
      hrms_id,
      division,
      office,
      level,
      payband, // Included payband
      id,
    ]
  );
};

module.exports = {
  createUser,
  findUserByHrmsId,
  findUserByEmail,
  findUserById,
  getAllUsers,
  deleteUser,
  updateUser,
  findUserByHrmsId,
};
