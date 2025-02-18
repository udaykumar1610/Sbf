// const pool = require("../config/db");

// const FamilyDetails = {
//   getAll: async () => {
//     const [rows] = await pool.query(`
//       SELECT fd.*, fc.dependent_name, fc.relationship, fc.age_dob, fc.remarks
//       FROM familyDetails fd
//       LEFT JOIN FamilyComposition fc ON fd.family_composition_id = fc.comp_id
//     `);
//     return rows;
//   },

//   getById: async (id) => {
//     const [rows] = await pool.query(
//       `
//       SELECT fd.*, fc.dependent_name, fc.relationship, fc.age_dob, fc.remarks
//       FROM familyDetails fd
//       LEFT JOIN FamilyComposition fc ON fd.family_composition_id = fc.comp_id
//       WHERE fd.emp_id = ?
//     `,
//       [id]
//     );
//     return rows;
//   },

//   getByStatus: async (status) => {
//     const [rows] = await pool.query(
//       `
//       SELECT * FROM familyDetails WHERE status = ?
//     `,
//       [status]
//     );
//     return rows;
//   },

//   // create: async (data) => {
//   //   // Insert into FamilyComposition first if dependent details are provided
//   //   console.log("data: ", data);
//   //   let familyCompId = null;
//   //   if (data.dependent_name) {
//   //     console.log("data_fc", data);
//   //     const [fcResult] = await pool.query(
//   //       `
//   //         INSERT INTO FamilyComposition (dependent_name, relationship, age_dob, remarks)
//   //         VALUES (?, ?, ?, ?)
//   //       `,
//   //       [data.dependent_name, data.relationship, data.age_dob, data.remarks]
//   //     );
//   //     familyCompId = fcResult.insertId;
//   //   }

//   //   // Insert into familyDetails
//   //   const sql = `
//   //       INSERT INTO familyDetails (
//   //         empname, spouse_details,son_or_wife_of, date_of_birth, date_of_appointment, bill_unit_number,
//   //         community, designation, office, department_division, pf_number, pay_in_pay_band,
//   //         running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
//   //         number_of_living_children_male, number_of_living_children_female,
//   //         number_of_living_children_total, sterilization_date, sterilization_hospital,
//   //         status, pdf_file_path, family_composition_id
//   //       ) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
//   //     `;

//   //   const params = [
//   //     data.empname,
//   //     data.spouse_details,
//   //     data.son_or_wife_of,
//   //     data.date_of_birth,
//   //     data.date_of_appointment,
//   //     data.bill_unit_number,
//   //     data.community,
//   //     data.designation,
//   //     data.office,
//   //     data.department_division,
//   //     data.pf_number,
//   //     data.pay_in_pay_band,
//   //     data.running_allowance,
//   //     data.grade_pay_substantive,
//   //     data.grade_pay_officiating_macp,
//   //     data.number_of_living_children_male,
//   //     data.number_of_living_children_female,
//   //     data.number_of_living_children_total,
//   //     data.sterilization_date,
//   //     data.sterilization_hospital,
//   //     data.status || "Submitted",
//   //     data.pdf_file_path || null,
//   //     familyCompId,
//   //   ];

//   //   const [result] = await pool.query(sql, params);
//   //   return result.insertId;
//   // },

//   // create: async (data) => {
//   //   console.log("data: ", data);
//   //   let familyCompId = null;

//   //   // Insert into FamilyComposition for each dependent in the familyComposition array
//   //   if (
//   //     data.familyComposition &&
//   //     Array.isArray(data.familyComposition) &&
//   //     data.familyComposition.length > 0
//   //   ) {
//   //     for (const dependent of data.familyComposition) {
//   //       if (
//   //         dependent.dependent_name &&
//   //         dependent.relationship &&
//   //         dependent.age_dob &&
//   //         dependent.remarks
//   //       ) {
//   //         // Insert each dependent to FamilyComposition table
//   //         console.log("data_fc", dependent);
//   //         const [fcResult] = await pool.query(
//   //           `
//   //             INSERT INTO FamilyComposition (dependent_name, relationship, age_dob, remarks)
//   //             VALUES (?, ?, ?, ?)
//   //           `,
//   //           [
//   //             dependent.dependent_name,
//   //             dependent.relationship,
//   //             dependent.age_dob,
//   //             dependent.remarks,
//   //           ]
//   //         );
//   //         familyCompId = fcResult.insertId; // Update familyCompId to the latest inserted ID
//   //       } else {
//   //         console.log("Skipping incomplete dependent data: ", dependent);
//   //       }
//   //     }
//   //   }

//   //   // Insert into familyDetails table with the appropriate family composition ID
//   //   const sql = `
//   //     INSERT INTO familyDetails (
//   //       empname, spouse_details, son_or_wife_of, date_of_birth, date_of_appointment, bill_unit_number,
//   //       community, designation, office, department_division, pf_number, pay_in_pay_band,
//   //       running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
//   //       number_of_living_children_male, number_of_living_children_female,
//   //       number_of_living_children_total, sterilization_date, sterilization_hospital,
//   //       status, pdf_file_path, family_composition_id
//   //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   //   `;

//   //   const params = [
//   //     data.empname,
//   //     data.spouse_details,
//   //     data.son_or_wife_of,
//   //     data.date_of_birth,
//   //     data.date_of_appointment,
//   //     data.bill_unit_number,
//   //     data.community,
//   //     data.designation,
//   //     data.office,
//   //     data.department_division || null, // Set to null if undefined
//   //     data.pf_number || null, // Set to null if undefined
//   //     data.pay_in_pay_band || null, // Set to null if undefined
//   //     data.running_allowance,
//   //     data.grade_pay_substantive,
//   //     data.grade_pay_officiating_macp,
//   //     data.number_of_living_children_male,
//   //     data.number_of_living_children_female,
//   //     data.number_of_living_children_total,
//   //     data.sterilization_date || null, // Handle null or undefined values
//   //     data.sterilization_hospital || null, // Handle null or undefined values
//   //     data.status || "Submitted", // Default to "Submitted" if status is undefined
//   //     data.pdf_file_path || null, // Set to null if undefined
//   //     familyCompId, // Use the last inserted family composition ID
//   //   ];

//   //   // Insert into familyDetails
//   //   const [result] = await pool.query(sql, params);
//   //   return result.insertId;
//   // },

//   create: async (data) => {
//     console.log("Received data: ", data);
//     let familyCompId = null;

//     // Ensure that familyComposition is an array. If it is already an object/array, no need to parse it.
//     if (!Array.isArray(data.familyComposition)) {
//       console.log(
//         "Invalid or empty familyComposition data:",
//         data.familyComposition
//       );
//       return; // Handle the case where familyComposition is not an array
//     }

//     // Insert into FamilyComposition for each dependent in the familyComposition array
//     if (data.familyComposition.length > 0) {
//       console.log("length", data.familyComposition.length);
//       for (const dependent of data.familyComposition) {
//         if (
//           dependent.dependent_name &&
//           dependent.relationship &&
//           dependent.age_dob &&
//           dependent.remarks
//         ) {
//           // Insert each dependent into the FamilyComposition table
//           console.log("Inserting dependent:", dependent);
//           const [fcResult] = await pool.query(
//             `INSERT INTO FamilyComposition (dependent_name, relationship, age_dob, remarks)
//            VALUES (?, ?, ?, ?)`,
//             [
//               dependent.dependent_name,
//               dependent.relationship,
//               dependent.age_dob,
//               dependent.remarks,
//             ]
//           );
//           familyCompId = fcResult.insertId; // Capture the last inserted ID
//         } else {
//           console.log("Skipping incomplete dependent data: ", dependent);
//         }
//       }
//     } else {
//       console.log(
//         "familyComposition is empty or invalid:",
//         data.familyComposition
//       );
//     }

//     // Insert into familyDetails table with the correct family composition ID
//     const sql = `
//     INSERT INTO familyDetails (
//       empname, spouse_details, son_or_wife_of, date_of_birth, date_of_appointment, bill_unit_number,
//       community, designation, office, department_division, pf_number, pay_in_pay_band,
//       running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
//       number_of_living_children_male, number_of_living_children_female,
//       number_of_living_children_total, sterilization_date, sterilization_hospital,
//       status, pdf_file_path, family_composition_id
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//     const params = [
//       data.empname,
//       data.spouse_details,
//       data.son_or_wife_of,
//       data.date_of_birth,
//       data.date_of_appointment,
//       data.bill_unit_number,
//       data.community,
//       data.designation,
//       data.office,
//       data.department_division || null, // Set to null if undefined
//       data.pf_number || null, // Set to null if undefined
//       data.pay_in_pay_band || null, // Set to null if undefined
//       data.running_allowance,
//       data.grade_pay_substantive,
//       data.grade_pay_officiating_macp,
//       data.number_of_living_children_male,
//       data.number_of_living_children_female,
//       data.number_of_living_children_total,
//       data.sterilization_date || null, // Handle null or undefined values
//       data.sterilization_hospital || null, // Handle null or undefined values
//       data.status || "Submitted", // Default to "Submitted" if status is undefined
//       data.pdf_file_path || null, // Set to null if undefined
//       familyCompId, // Use the last inserted family composition ID
//     ];

//     const [result] = await pool.query(sql, params);
//     return result.insertId; // Return the inserted familyDetails ID
//   },

//   // create: async (data) => {
//   //   console.log("data: ", data);

//   //   // Parse familyComposition if it's a string
//   //   let familyCompositionData = [];
//   //   if (data.familyComposition) {
//   //     try {
//   //       familyCompositionData = JSON.parse(data.familyComposition); // Deserialize the JSON string to an array
//   //     } catch (err) {
//   //       console.error("Error parsing familyComposition:", err);
//   //     }
//   //   }

//   //   let familyCompId = null;

//   //   // Insert into FamilyComposition for each dependent in the familyComposition array
//   //   if (
//   //     Array.isArray(familyCompositionData) &&
//   //     familyCompositionData.length > 0
//   //   ) {
//   //     for (const dependent of familyCompositionData) {
//   //       if (
//   //         dependent.dependent_name &&
//   //         dependent.relationship &&
//   //         dependent.age_dob &&
//   //         dependent.remarks
//   //       ) {
//   //         // Insert each dependent to FamilyComposition table
//   //         console.log("data_fc", dependent);
//   //         const [fcResult] = await pool.query(
//   //           `
//   //             INSERT INTO FamilyComposition (dependent_name, relationship, age_dob, remarks)
//   //             VALUES (?, ?, ?, ?)
//   //           `,
//   //           [
//   //             dependent.dependent_name,
//   //             dependent.relationship,
//   //             dependent.age_dob,
//   //             dependent.remarks,
//   //           ]
//   //         );
//   //         familyCompId = fcResult.insertId; // Update familyCompId to the latest inserted ID
//   //       } else {
//   //         console.log("Skipping incomplete dependent data: ", dependent);
//   //       }
//   //     }
//   //   }

//   //   // Insert into familyDetails table with the appropriate family composition ID
//   //   const sql = `
//   //     INSERT INTO familyDetails (
//   //       empname, spouse_details, son_or_wife_of, date_of_birth, date_of_appointment, bill_unit_number,
//   //       community, designation, office, department_division, pf_number, pay_in_pay_band,
//   //       running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
//   //       number_of_living_children_male, number_of_living_children_female,
//   //       number_of_living_children_total, sterilization_date, sterilization_hospital,
//   //       status, pdf_file_path, family_composition_id
//   //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   //   `;

//   //   const params = [
//   //     data.empname,
//   //     data.spouse_details,
//   //     data.son_or_wife_of,
//   //     data.date_of_birth,
//   //     data.date_of_appointment,
//   //     data.bill_unit_number,
//   //     data.community,
//   //     data.designation,
//   //     data.office,
//   //     data.department_division || null, // Set to null if undefined
//   //     data.pf_number || null, // Set to null if undefined
//   //     data.pay_in_pay_band || null, // Set to null if undefined
//   //     data.running_allowance,
//   //     data.grade_pay_substantive,
//   //     data.grade_pay_officiating_macp,
//   //     data.number_of_living_children_male,
//   //     data.number_of_living_children_female,
//   //     data.number_of_living_children_total,
//   //     data.sterilization_date || null, // Handle null or undefined values
//   //     data.sterilization_hospital || null, // Handle null or undefined values
//   //     data.status || "Submitted", // Default to "Submitted" if status is undefined
//   //     data.pdf_file_path || null, // Set to null if undefined
//   //     familyCompId, // Use the last inserted family composition ID
//   //   ];

//   //   // Insert into familyDetails
//   //   const [result] = await pool.query(sql, params);
//   //   return result.insertId;
//   // },

//   update: async (id, data) => {
//     const sql = `
//       UPDATE familyDetails SET
//         empname=?, spouse_details=?, son_or_wife_of=?,date_of_birth=?, date_of_appointment=?, bill_unit_number=?,
//         community=?, designation=?, office=?, department_division=?, pf_number=?,
//         pay_in_pay_band=?, running_allowance=?, grade_pay_substantive=?,
//         grade_pay_officiating_macp=?, number_of_living_children_male=?,
//         number_of_living_children_female=?, number_of_living_children_total=?,
//         sterilization_date=?, sterilization_hospital=?, status=?, pdf_file_path=?
//       WHERE emp_id=?
//     `;

//     const params = [
//       data.empname,
//       data.spouse_details,
//       data.son_or_wife_of,
//       data.date_of_birth,
//       data.date_of_appointment,
//       data.bill_unit_number,
//       data.community,
//       data.designation,
//       data.office,
//       data.department_division,
//       data.pf_number,
//       data.pay_in_pay_band,
//       data.running_allowance,
//       data.grade_pay_substantive,
//       data.grade_pay_officiating_macp,
//       data.number_of_living_children_male,
//       data.number_of_living_children_female,
//       data.number_of_living_children_total,
//       data.sterilization_date,
//       data.sterilization_hospital,
//       data.status,
//       data.pdf_file_path,
//       id,
//     ];

//     await pool.query(sql, params);
//   },

//   delete: async (id) => {
//     await pool.query("DELETE FROM familyDetails WHERE emp_id = ?", [id]);
//   },
// };

// module.exports = FamilyDetails;

const pool = require("../config/db");

const FamilyDetails = {
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT fd.*, fc.dependent_name, fc.relationship, fc.age_dob, fc.remarks
      FROM familyDetails fd
      LEFT JOIN FamilyComposition fc ON fd.emp_id = fc.emp_id
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      `
      SELECT fd.*, fc.dependent_name, fc.relationship, fc.age_dob, fc.remarks
      FROM familyDetails fd
      LEFT JOIN FamilyComposition fc ON fd.family_composition_id = fc.comp_id
      WHERE fd.emp_id = ?
    `,
      [id]
    );
    return rows;
  },

  getByStatus: async (status) => {
    const [rows] = await pool.query(
      `
      SELECT * FROM familyDetails WHERE status = ?
    `,
      [status]
    );
    return rows;
  },

  // create: async (data) => {
  //   const sql = `
  //     INSERT INTO familyDetails (
  //       empname, son_or_wife_of, spouse_details, date_of_birth, date_of_appointment,
  //       bill_unit_number, community, designation, office, department_division, pf_number,
  //       pay_in_pay_band, running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
  //       number_of_living_children_male, number_of_living_children_female, number_of_living_children_total,
  //       sterilization_date, sterilization_hospital, status, pdf_file_path
  //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //   `;

  //   const params = [
  //     data.empname,
  //     data.son_or_wife_of,
  //     data.spouse_details,
  //     data.date_of_birth,
  //     data.date_of_appointment,
  //     data.bill_unit_number,
  //     data.community,
  //     data.designation,
  //     data.office,
  //     data.department_division,
  //     data.pf_number,
  //     data.pay_in_pay_band,
  //     data.running_allowance,
  //     data.grade_pay_substantive,
  //     data.grade_pay_officiating_macp,
  //     data.number_of_living_children_male,
  //     data.number_of_living_children_female,
  //     data.number_of_living_children_total,
  //     data.sterilization_date,
  //     data.sterilization_hospital,
  //     data.status || "Submitted",
  //     data.pdf_file_path || null,
  //   ];

  //   const [result] = await pool.query(sql, params);
  //   return result.insertId;
  // },

  update: async (id, data) => {
    const sql = `
      UPDATE familyDetails SET
        empname=?, son_or_wife_of=?, spouse_details=?, date_of_birth=?, date_of_appointment=?,
        bill_unit_number=?, community=?, designation=?, office=?, department_division=?,
        pf_number=?, pay_in_pay_band=?, running_allowance=?, grade_pay_substantive=?,
        grade_pay_officiating_macp=?, number_of_living_children_male=?,
        number_of_living_children_female=?, number_of_living_children_total=?,
        sterilization_date=?, sterilization_hospital=?, status=?, pdf_file_path=?
      WHERE id=?
    `;

    const params = [
      data.empname,
      data.son_or_wife_of,
      data.spouse_details,
      data.date_of_birth,
      data.date_of_appointment,
      data.bill_unit_number,
      data.community,
      data.designation,
      data.office,
      data.department_division,
      data.pf_number,
      data.pay_in_pay_band,
      data.running_allowance,
      data.grade_pay_substantive,
      data.grade_pay_officiating_macp,
      data.number_of_living_children_male,
      data.number_of_living_children_female,
      data.number_of_living_children_total,
      data.sterilization_date,
      data.sterilization_hospital,
      data.status,
      data.pdf_file_path,
      id,
    ];

    await pool.query(sql, params);
  },

  delete: async (id) => {
    await pool.query("DELETE FROM familyDetails WHERE id = ?", [id]);
  },
};

module.exports = FamilyDetails;
