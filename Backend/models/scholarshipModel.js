// const pool = require("../config/db");

// // Function to convert `YYYY-MM-DDTHH:MM:SS.sssZ` to `YYYY-MM-DD`
// const formatDate = (dateString) => {
//   if (!dateString) return null;
//   return new Date(dateString).toISOString().split("T")[0]; // Extract YYYY-MM-DD
// };

// // Create Scholarship
// const createScholarship = async (data, pdfFilePath) => {
//   const {
//     empname,
//     scholar_name,
//     relationship,
//     spouse_govt_employee_details,
//     date_of_appointment,
//     bill_unit_no,
//     designation,
//     office,
//     division,
//     telephone_number,
//     mobile_number,
//     pf_no,
//     pay_level,
//     macp_pay_level,
//     basic_pay,
//     course_of_study,
//     year_of_study,
//     institution_name,
//     tuition_fee_exemption,
//     student_employment_status,
//     other_scholarships_value,
//   } = data;

//   await pool.query(
//     `INSERT INTO scholarships
//     (empname, scholar_name, relationship, spouse_govt_employee_details, date_of_appointment, bill_unit_no,
//     designation, office, division, telephone_number, mobile_number, pf_no, pay_level, macp_pay_level,
//     basic_pay, course_of_study, year_of_study, institution_name, tuition_fee_exemption, student_employment_status,
//     other_scholarships_value, pdf_file_path)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       empname,
//       scholar_name,
//       relationship,
//       spouse_govt_employee_details,
//       formatDate(date_of_appointment), // ✅ Fix Date Format
//       bill_unit_no,
//       designation,
//       office,
//       division,
//       telephone_number,
//       mobile_number,
//       pf_no,
//       pay_level,
//       macp_pay_level,
//       basic_pay,
//       course_of_study,
//       year_of_study,
//       institution_name,
//       tuition_fee_exemption,
//       student_employment_status,
//       other_scholarships_value,
//       pdfFilePath,
//     ]
//   );
// };

// // Update Scholarship
// const updateScholarship = async (id, data, pdfFilePath) => {
//   await pool.query(
//     `UPDATE scholarships SET
//       empname = ?, scholar_name = ?, relationship = ?, spouse_govt_employee_details = ?,
//       date_of_appointment = ?, bill_unit_no = ?, designation = ?, office = ?, division = ?,
//       telephone_number = ?, mobile_number = ?, pf_no = ?, pay_level = ?, macp_pay_level = ?,
//       basic_pay = ?, course_of_study = ?, year_of_study = ?, institution_name = ?,
//       tuition_fee_exemption = ?, student_employment_status = ?, other_scholarships_value = ?,
//       pdf_file_path = ?
//     WHERE id = ?`,
//     [
//       data.empname,
//       data.scholar_name,
//       data.relationship,
//       data.spouse_govt_employee_details,
//       formatDate(data.date_of_appointment), // ✅ Fix Date Format
//       data.bill_unit_no,
//       data.designation,
//       data.office,
//       data.division,
//       data.telephone_number,
//       data.mobile_number,
//       data.pf_no,
//       data.pay_level,
//       data.macp_pay_level,
//       data.basic_pay,
//       data.course_of_study,
//       data.year_of_study,
//       data.institution_name,
//       data.tuition_fee_exemption,
//       data.student_employment_status,
//       data.other_scholarships_value,
//       pdfFilePath,
//       id,
//     ]
//   );
// };

// // Get all scholarships
// const getAllScholarships = async () => {
//   const [rows] = await pool.query("SELECT * FROM scholarships");
//   return rows;
// };

// // Get scholarship by ID
// const getScholarshipById = async (id) => {
//   const [rows] = await pool.query("SELECT * FROM scholarships WHERE id = ?", [
//     id,
//   ]);
//   return rows.length ? rows[0] : null;
// };

// // Update scholarship by ID with PDF

// // Delete scholarship by ID
// const deleteScholarship = async (id) => {
//   await pool.query("DELETE FROM scholarships WHERE id = ?", [id]);
// };

// module.exports = {
//   createScholarship,
//   getAllScholarships,
//   getScholarshipById,
//   updateScholarship,
//   deleteScholarship,
// };

const pool = require("../config/db");

// Function to convert `YYYY-MM-DDTHH:MM:SS.sssZ` to `YYYY-MM-DD`
const formatDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString).toISOString().split("T")[0];
};

// Create Scholarship
const createScholarship = async (data, pdfFilePath) => {
  const {
    empname,
    scholar_name,
    relationship,
    spouse_govt_employee_details,
    date_of_appointment,
    bill_unit_no,
    designation,
    office,
    division,
    telephone_number,
    mobile_number,
    pf_no,
    pay_level,
    macp_pay_level,
    basic_pay,
    course_of_study,
    year_of_study,
    institution_name,
    tuition_fee_exemption,
    student_employment_status,
    other_scholarships_value,
    status = "submitted", // Default status
  } = data;

  await pool.query(
    `INSERT INTO scholarships 
    (empname, scholar_name, relationship, spouse_govt_employee_details, date_of_appointment, bill_unit_no, 
    designation, office, division, telephone_number, mobile_number, pf_no, pay_level, macp_pay_level, 
    basic_pay, course_of_study, year_of_study, institution_name, tuition_fee_exemption, student_employment_status, 
    other_scholarships_value, pdf_file_path, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

    [
      empname,
      scholar_name,
      relationship,
      spouse_govt_employee_details,
      formatDate(date_of_appointment),
      bill_unit_no,
      designation,
      office,
      division,
      telephone_number,
      mobile_number,
      pf_no,
      pay_level,
      macp_pay_level,
      basic_pay,
      course_of_study,
      year_of_study,
      institution_name,
      tuition_fee_exemption,
      student_employment_status,
      other_scholarships_value,
      pdfFilePath,
      status,
    ]
  );
};

// Update Scholarship
const updateScholarship = async (id, data, pdfFilePath) => {
  await pool.query(
    `UPDATE scholarships SET 
      empname = ?, scholar_name = ?, relationship = ?, spouse_govt_employee_details = ?, 
      date_of_appointment = ?, bill_unit_no = ?, designation = ?, office = ?, division = ?, 
      telephone_number = ?, mobile_number = ?, pf_no = ?, pay_level = ?, macp_pay_level = ?, 
      basic_pay = ?, course_of_study = ?, year_of_study = ?, institution_name = ?, 
      tuition_fee_exemption = ?, student_employment_status = ?, other_scholarships_value = ?, 
      pdf_file_path = ?, status = ? 
    WHERE id = ?`,

    [
      data.empname,
      data.scholar_name,
      data.relationship,
      data.spouse_govt_employee_details,
      formatDate(data.date_of_appointment),
      data.bill_unit_no,
      data.designation,
      data.office,
      data.division,
      data.telephone_number,
      data.mobile_number,
      data.pf_no,
      data.pay_level,
      data.macp_pay_level,
      data.basic_pay,
      data.course_of_study,
      data.year_of_study,
      data.institution_name,
      data.tuition_fee_exemption,
      data.student_employment_status,
      data.other_scholarships_value,
      pdfFilePath,
      data.status, // Allow updating status
      id,
    ]
  );
};

// Get all scholarships (with PDF path)
// const getAllScholarships = async () => {
//   const [rows] = await pool.query(
//     "SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url FROM scholarships"
//   );
//   return rows;
// };

// const getAllScholarships = async () => {
//   const [rows] = await pool.query(
//     "SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url FROM scholarships"
//   );
//   return rows;
// };

// Get all scholarships
const getAllScholarships = async () => {
  const baseUrl = process.env.BASE_URL; // Access the environment variable here
  const [rows] = await pool.query(
    "SELECT *, CONCAT(?, '/', pdf_file_path) AS pdf_url FROM scholarships",
    [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
  );
  return rows;
};

// Get scholarship by ID (with PDF path)
const getScholarshipById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url 
     FROM scholarships WHERE id = ?`,
    [id]
  );
  return rows.length ? rows[0] : null;
};

// Get scholarships by status
const getScholarshipsByStatus = async (status) => {
  const [rows] = await pool.query(
    `SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url 
     FROM scholarships WHERE status = ?`,
    [status]
  );
  return rows;
};

// Delete scholarship by ID
const deleteScholarship = async (id) => {
  await pool.query("DELETE FROM scholarships WHERE id = ?", [id]);
};

module.exports = {
  createScholarship,
  getAllScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
  getScholarshipsByStatus,
};
