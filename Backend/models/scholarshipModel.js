// const pool = require("../config/db");

// // Function to convert `YYYY-MM-DDTHH:MM:SS.sssZ` to `YYYY-MM-DD`
// const formatDate = (dateString) => {
//   if (!dateString) return null;
//   return new Date(dateString).toISOString().split("T")[0];
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
//     status = "submitted", // Default status
//   } = data;

//   await pool.query(
//     `

//     INSERT INTO scholarships
//     (empname, scholar_name, relationship, spouse_govt_employee_details, date_of_appointment, bill_unit_no,
//     designation, office, division, telephone_number, mobile_number, pf_no, pay_level, macp_pay_level,
//     basic_pay, course_of_study, year_of_study, institution_name, tuition_fee_exemption, student_employment_status,
//     other_scholarships_value, pdf_file_path, status)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

//     [
//       empname,
//       scholar_name,
//       relationship,
//       spouse_govt_employee_details,
//       formatDate(date_of_appointment),
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
//       status,
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
//       pdf_file_path = ?, status = ?
//     WHERE id = ?`,

//     [
//       data.empname,
//       data.scholar_name,
//       data.relationship,
//       data.spouse_govt_employee_details,
//       formatDate(data.date_of_appointment),
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
//       data.status, // Allow updating status
//       id,
//     ]
//   );
// };

// // Get all scholarships (with PDF path)
// // const getAllScholarships = async () => {
// //   const [rows] = await pool.query(
// //     "SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url FROM scholarships"
// //   );
// //   return rows;
// // };

// // const getAllScholarships = async () => {
// //   const [rows] = await pool.query(
// //     "SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url FROM scholarships"
// //   );
// //   return rows;
// // };

// // Get all scholarships
// const getAllScholarships = async () => {
//   const baseUrl = process.env.BASE_URL; // Access the environment variable here
//   const [rows] = await pool.query(
//     "SELECT *, CONCAT(?, '/', pdf_file_path) AS pdf_url FROM scholarships",
//     [baseUrl] // Pass the BASE_URL as a parameter to prevent SQL injection
//   );
//   return rows;
// };

// // Get scholarship by ID (with PDF path)
// // const getScholarshipById = async (id) => {
// //   const [rows] = await pool.query(
// //     `SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url
// //      FROM scholarships WHERE id = ?`,
// //     [id]
// //   );
// //   return rows.length ? rows[0] : null;
// // };

// // Get scholarship by ID (with PDF path)
// const getScholarshipById = async (id) => {
//   const baseUrl = process.env.BASE_URL; // Access the environment variable here
//   const [rows] = await pool.query(
//     "SELECT *, CONCAT(?, '/', pdf_file_path) AS pdf_url FROM scholarships WHERE id = ?",
//     [baseUrl, id] // Pass the BASE_URL and id as parameters
//   );
//   return rows.length ? rows[0] : null;
// };

// // Get scholarships by status
// const getScholarshipsByStatus = async (status) => {
//   const baseUrl = process.env.BASE_URL; // Access the environment variable here
//   const [rows] = await pool.query(
//     "SELECT *, CONCAT(?, '/', pdf_file_path) AS pdf_url FROM scholarships WHERE status = ?",
//     [baseUrl, status] // Pass the BASE_URL and status as parameters
//   );
//   return rows;
// };

// // Get scholarships by status
// // const getScholarshipsByStatus = async (status) => {
// //   const [rows] = await pool.query(
// //     `SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url
// //      FROM scholarships WHERE status = ?`,
// //     [status]
// //   );
// //   return rows;
// // };

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
//   getScholarshipsByStatus,
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

  console.log("model scholar:", pay_level.trim().toLowerCase());

  let existingScholarship;

  if (
    ["level5", "level6", "level7", "level8"].includes(
      pay_level.trim().toLowerCase()
    )
  ) {
    // Check if a scholarship has already been posted for this pay level
    existingScholarship = await pool.query(
      `SELECT COUNT(*) AS count FROM scholarships WHERE pay_level IN ('level5', 'level6', 'level7', 'level8') AND empname = ?`,
      [empname]
    );

    console.log("existingScholarship 2:", existingScholarship[0][0].count);

    // If a scholarship for this pay level exists, prevent posting more
    if (existingScholarship[0][0].count > 0 && relationship != "Twins") {
      console.log("model scholar:", data);
      throw new Error(
        "A scholarship can only be posted once for pay levels level5, level6, level7, level8."
      );
    } else if (relationship == "Twins" && existingScholarship[0][0].count > 2) {
      throw new Error(
        "A scholarship can only be posted  twice (if  children's are twins) for pay levels level5, level6, level7, level8."
      );
    }

    // Insert the scholarship data if no existing scholarship for this pay level
    else if (
      !existingScholarship ||
      existingScholarship[0][0].count === 0 ||
      (relationship === "Twins" && existingScholarship[0][0].count <= 2)
    ) {
      await pool.query(
        `
          INSERT INTO scholarships
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
    }
  } else if (
    ["level1", "level2", "level3", "level4"].includes(
      pay_level.trim().toLowerCase()
    )
  ) {
    existingScholarship = await pool.query(
      `SELECT COUNT(*) AS count FROM scholarships WHERE pay_level IN ('level1', 'level2', 'level3', 'level4') AND empname = ?`,
      [empname]
    );

    if (existingScholarship[0][0].count > 2) {
      console.log("model scholar:", data);
      throw new Error(
        "A scholarship can only be posted only twice for pay levels level1, level2, level3, level4."
      );
    } else if (!existingScholarship || existingScholarship[0][0].count <= 2) {
      await pool.query(
        `
          INSERT INTO scholarships
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
    }
  }
};

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
//     status = "submitted", // Default status
//   } = data;

//   try {
//     if (
//       ["level5", "level6", "level7", "level8"].includes(
//         pay_level.trim().toLowerCase()
//       )
//     ) {
//       const existingScholarship = await pool.query(
//         `SELECT COUNT(*) AS count FROM scholarships WHERE pay_level IN ('level5', 'level6', 'level7', 'level8') AND empname = ?`,
//         [empname]
//       );
//       if (existingScholarship[0][0].count > 0) {
//         return "A scholarship can only be posted once for pay levels level5, level6, level7, level8.";
//       } else if (existingScholarship[0][0].count == 0) {
//         await pool.query(
//           `INSERT INTO scholarships
//     (empname, scholar_name, relationship, spouse_govt_employee_details, date_of_appointment, bill_unit_no,
//     designation, office, division, telephone_number, mobile_number, pf_no, pay_level, macp_pay_level,
//     basic_pay, course_of_study, year_of_study, institution_name, tuition_fee_exemption, student_employment_status,
//     other_scholarships_value, pdf_file_path, status)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             empname,
//             scholar_name,
//             relationship,
//             spouse_govt_employee_details,
//             formatDate(date_of_appointment),
//             bill_unit_no,
//             designation,
//             office,
//             division,
//             telephone_number,
//             mobile_number,
//             pf_no,
//             pay_level,
//             macp_pay_level,
//             basic_pay,
//             course_of_study,
//             year_of_study,
//             institution_name,
//             tuition_fee_exemption,
//             student_employment_status,
//             other_scholarships_value,
//             pdfFilePath,
//             status,
//           ]
//         );
//       }
//     }
//   } catch (err) {
//     // Log the detailed error for debugging purposes
//     console.error("Error in creating scholarship:", err);

//     // Throw a user-friendly error message
//     return;
//     ("There was an issue creating the scholarship. Please try again later.");
//   }
// };

//Insert the new scholarship record only if conditions are met
// await pool.query(
//   `
//   INSERT INTO scholarships
//   (empname, scholar_name, relationship, spouse_govt_employee_details, date_of_appointment, bill_unit_no,
//   designation, office, division, telephone_number, mobile_number, pf_no, pay_level, macp_pay_level,
//   basic_pay, course_of_study, year_of_study, institution_name, tuition_fee_exemption, student_employment_status,
//   other_scholarships_value, pdf_file_path, status)
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//   [
//     empname,
//     scholar_name,
//     relationship,
//     spouse_govt_employee_details,
//     formatDate(date_of_appointment),
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
//     pdfFilePath,
//     status,
//   ]
// );

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
// const getScholarshipById = async (id) => {
//   const [rows] = await pool.query(
//     `SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url
//      FROM scholarships WHERE id = ?`,
//     [id]
//   );
//   return rows.length ? rows[0] : null;
// };

// Get scholarship by ID (with PDF path)
const getScholarshipById = async (id) => {
  const baseUrl = process.env.BASE_URL; // Access the environment variable here
  const [rows] = await pool.query(
    "SELECT *, CONCAT(?, '/', pdf_file_path) AS pdf_url FROM scholarships WHERE id = ?",
    [baseUrl, id] // Pass the BASE_URL and id as parameters
  );
  return rows.length ? rows[0] : null;
};

// Get scholarships by status
const getScholarshipsByStatus = async (status) => {
  const baseUrl = process.env.BASE_URL; // Access the environment variable here
  const [rows] = await pool.query(
    "SELECT *, CONCAT(?, '/', pdf_file_path) AS pdf_url FROM scholarships WHERE status = ?",
    [baseUrl, status] // Pass the BASE_URL and status as parameters
  );
  return rows;
};

// Get scholarships by status
// const getScholarshipsByStatus = async (status) => {
//   const [rows] = await pool.query(
//     `SELECT *, CONCAT('${process.env.BASE_URL}/', pdf_file_path) AS pdf_url
//      FROM scholarships WHERE status = ?`,
//     [status]
//   );
//   return rows;
// };

//update by status

const updatestatus = async (id, status) => {
  console.log("models", status, "id :", id);
  const sql = `
      UPDATE scholarships SET status=? WHERE id=?
    `;
  console.log(sql);
  const params = [status, id];
  console.log(" after models", status, "id :", id);

  const result = await pool.query(sql, params);
  console.log(result);
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
  updatestatus,
  getScholarshipsByStatus,
};
