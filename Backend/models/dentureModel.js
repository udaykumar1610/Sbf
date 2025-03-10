const db = require("../config/db");

// Get all dentures
// const getAllDentures = () => {
//   return db.query("SELECT * FROM Dentures");
// };

const getAllDentures = async () => {
  const baseUrl = process.env.BASE_URL;

  const rows = await db.query(
    "SELECT *, CONCAT(?,  pdfFilePath) AS pdf_url FROM Dentures",
    [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
  );
  return rows;
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
const createDenture = async (dentureData) => {
  const { empname } = dentureData;
  //console.log("emp name :", empname);

  const [existingDenture] = await db.query(
    "select * from Dentures where empname=?",
    [empname]
  );
  //console.log("length : ", existingDenture.length);

  if (existingDenture.length > 0) {
    throw new Error(
      `A denture for Employee ${empname} already exists. Only one denture is allowed per service.`
    );
  }
  return db.query("INSERT INTO Dentures SET ?", dentureData);
};

// Update denture
const updateDenture = (id, updatedData) => {
  return db.query("UPDATE Dentures SET ? WHERE id = ?", [updatedData, id]);
};

const updateStatus = async (id, status) => {
  console.log("models", status, "id :", id);
  const sql = `
      UPDATE Dentures SET status=? WHERE id=?
    `;
  console.log(sql);
  const params = [status, id];
  console.log(" after models", status, "id :", id);

  const result = await db.query(sql, params);
  console.log(result);
};

const updateRemarks = async (id, status, remarks) => {
  // Define the SQL query with proper column updates
  const sql = `
      UPDATE Dentures 
      SET remarks = ?, status = ? 
      WHERE id = ?
    `;

  // Prepare the parameters for the query
  const params = [remarks, status, id];

  // Execute the query
  try {
    const result = await db.query(sql, params);
    console.log(result); // Log the result
  } catch (error) {
    console.error("Error updating remarks:", error);
  }
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
  updateStatus,
  updateRemarks,
  deleteDenture,
};
