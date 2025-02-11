// const pool = require("../config/db");

// // Create a new scholarship entry
// const createScholarship = async (data) => {
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
//   } = data;

//   await pool.query(
//     `INSERT INTO scholarships
//     (empname, scholar_name, relationship, spouse_govt_employee_details, date_of_appointment, bill_unit_no,
//     designation, office, division, telephone_number, mobile_number, pf_no, pay_level, macp_pay_level,
//     basic_pay, course_of_study, year_of_study, institution_name, tuition_fee_exemption, student_employment_status)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       empname,
//       scholar_name,
//       relationship,
//       spouse_govt_employee_details,
//       date_of_appointment,
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

// // Update scholarship by ID
// const updateScholarship = async (id, data) => {
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
//   } = data;

//   await pool.query(
//     `UPDATE scholarships SET
//       empname = ?, scholar_name = ?, relationship = ?, spouse_govt_employee_details = ?, date_of_appointment = ?,
//       bill_unit_no = ?, designation = ?, office = ?, division = ?, telephone_number = ?, mobile_number = ?,
//       pf_no = ?, pay_level = ?, macp_pay_level = ?, basic_pay = ?, course_of_study = ?, year_of_study = ?,
//       institution_name = ?, tuition_fee_exemption = ?, student_employment_status = ?
//     WHERE id = ?`,
//     [
//       empname,
//       scholar_name,
//       relationship,
//       spouse_govt_employee_details,
//       date_of_appointment,
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
//       id,
//     ]
//   );
// };

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

// Create a new scholarship entry
const createScholarship = async (data) => {
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
    other_scholarships_value, // New field
  } = data;

  await pool.query(
    `INSERT INTO scholarships 
    (empname, scholar_name, relationship, spouse_govt_employee_details, date_of_appointment, bill_unit_no,
    designation, office, division, telephone_number, mobile_number, pf_no, pay_level, macp_pay_level,
    basic_pay, course_of_study, year_of_study, institution_name, tuition_fee_exemption, student_employment_status, other_scholarships_value) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
    [
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
      other_scholarships_value, // Pass the new field
    ]
  );
};

// Get all scholarships
const getAllScholarships = async () => {
  const [rows] = await pool
    .query("SELECT * FROM scholarships")
    .then((result) => {
      console.log("result: ", result);
    })
    .catch((err) => {
      console.log("error: ", err);
    });
  return rows;
};

// Get scholarship by ID
const getScholarshipById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM scholarships WHERE id = ?", [
    id,
  ]);
  return rows.length ? rows[0] : null;
};

// Update scholarship by ID
const updateScholarship = async (id, data) => {
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
    other_scholarships_value, // New field
  } = data;

  await pool.query(
    `UPDATE scholarships SET 
      empname = ?, scholar_name = ?, relationship = ?, spouse_govt_employee_details = ?, date_of_appointment = ?, 
      bill_unit_no = ?, designation = ?, office = ?, division = ?, telephone_number = ?, mobile_number = ?, 
      pf_no = ?, pay_level = ?, macp_pay_level = ?, basic_pay = ?, course_of_study = ?, year_of_study = ?, 
      institution_name = ?, tuition_fee_exemption = ?, student_employment_status = ?, other_scholarships_value = ? 
    WHERE id = ?`,
    [
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
      other_scholarships_value, // Pass the new field
      id,
    ]
  );
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
};
