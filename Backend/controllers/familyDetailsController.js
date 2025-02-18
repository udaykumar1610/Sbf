const FamilyDetails = require("../models/familyDetailsModel");
const pool = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const data = await FamilyDetails.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await FamilyDetails.getById(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByStatus = async (req, res) => {
  try {
    const data = await FamilyDetails.getByStatus(req.params.status);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.create = async (req, res) => {
//   console.log("family details.");
//   console.log("Request Body: ", req.body);
//   try {
//     const {
//       bill_unit_number,
//       community,
//       date_of_appointment,
//       date_of_birth,
//       department_division,
//       designation,
//       empname,
//       grade_pay_officiating_macp,
//       grade_pay_substantive,
//       number_of_living_children_female,
//       number_of_living_children_male,
//       number_of_living_children_total,
//       office,
//       pay_in_pay_band,
//       pf_number,
//       running_allowance,
//       son_or_wife_of,
//       spouse_details,
//       status,
//       sterilization_date,
//       sterilization_hospital,
//       familyComposition, // Add this to the destructuring
//     } = req.body;

//     const pdf_file_path = req.file ? req.file.filename : null;

//     // Inserting into the Family Details Table
//     const query = `
//       INSERT INTO familyDetails (
//           empname, son_or_wife_of, spouse_details, date_of_birth, date_of_appointment,
//           bill_unit_number, community, designation, office, department_division, pf_number,
//           pay_in_pay_band, running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
//           number_of_living_children_male, number_of_living_children_female, number_of_living_children_total,
//           sterilization_date, sterilization_hospital, status, pdf_file_path
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;

//     const values = [
//       empname,
//       son_or_wife_of,
//       spouse_details,
//       date_of_birth,
//       date_of_appointment,
//       bill_unit_number,
//       community,
//       designation,
//       office,
//       department_division,
//       pf_number,
//       pay_in_pay_band,
//       running_allowance,
//       grade_pay_substantive,
//       grade_pay_officiating_macp,
//       number_of_living_children_male,
//       number_of_living_children_female,
//       number_of_living_children_total,
//       sterilization_date,
//       sterilization_hospital,
//       status,
//       pdf_file_path,
//     ];
//     // const result = await pool.query(query, values);
//     // console.log("result: ", result);

//     await pool.query(query, values, (error, result) => {
//       console.log("Hello");
//       if (error) {
//         console.error("Error inserting familyDetails: ", error);
//         return res
//           .status(500)
//           .json({ message: "Internal Server Error", success: false });
//       }

//       const empId = result?.insertId;
//       console.log("empid: ", empId);

//       if (empId && familyComposition) {
//         let parsedFamilyComposition = [];
//         try {
//           parsedFamilyComposition = JSON.parse(familyComposition); // Safe JSON parse
//         } catch (parseError) {
//           console.error("Error parsing familyComposition: ", parseError);
//           return res.status(400).json({
//             message: "Invalid familyComposition data",
//             success: false,
//           });
//         }

//         if (parsedFamilyComposition?.length > 0) {
//           console.log("familyComposition: ", parsedFamilyComposition);

//           // Loop over familyComposition and insert each record into the FamilyComposition table
//           parsedFamilyComposition.forEach(
//             ({ dependent_name, relationship, age_dob, remarks }) => {
//               // Convert age_dob to a valid date format
//               let formatted_age_dob = new Date(age_dob);
//               if (isNaN(formatted_age_dob.getTime())) {
//                 console.error("Invalid date format for age_dob: ", age_dob);
//                 return;
//               }

//               // Insert into the FamilyComposition Table
//               const query = `INSERT INTO FamilyComposition (dependent_name, relationship, age_dob, remarks, emp_id)
//                            VALUES (?, ?, ?, ?, ?)`;
//               pool.query(
//                 query,
//                 [
//                   dependent_name,
//                   relationship,
//                   formatted_age_dob,
//                   remarks,
//                   empId,
//                 ],
//                 (error, result) => {
//                   if (error) {
//                     console.error(
//                       "Error inserting into FamilyComposition: ",
//                       error
//                     );
//                     return res.status(500).json({
//                       message:
//                         "Error while Inserting data into FamilyComposition",
//                       success: false,
//                     });
//                   }
//                 }
//               );
//             }
//           );
//         }
//       }

//       return res.status(201).json({
//         message: "Family Details Inserted Successfully",
//         success: true,
//         emp_id: result.insertId,
//       });
//     });
//   } catch (error) {
//     console.log("Error Occurred in familyDetails", error);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", success: false });
//   }
// };

exports.create = async (req, res) => {
  console.log("family details.");
  console.log("Request Body: ", req.body);

  try {
    const {
      bill_unit_number,
      community,
      date_of_appointment,
      date_of_birth,
      department_division,
      designation,
      empname,
      grade_pay_officiating_macp,
      grade_pay_substantive,
      number_of_living_children_female,
      number_of_living_children_male,
      number_of_living_children_total,
      office,
      pay_in_pay_band,
      pf_number,
      running_allowance,
      son_or_wife_of,
      spouse_details,
      status,
      sterilization_date,
      sterilization_hospital,
      familyComposition,
    } = req.body;

    const pdf_file_path = req.file
      ? `/uploads/familyDetails/${req.file.filename}`
      : null;
    //const newRecord = { ...req.body, pdf_file: pdf_file_path};

    //  const pdf_file_path = req.file ? req.file.filename : null;

    // Inserting into the Family Details Table
    const query = `
      INSERT INTO familyDetails (
          empname, son_or_wife_of, spouse_details, date_of_birth, date_of_appointment,
          bill_unit_number, community, designation, office, department_division, pf_number, 
          pay_in_pay_band, running_allowance, grade_pay_substantive, grade_pay_officiating_macp,
          number_of_living_children_male, number_of_living_children_female, number_of_living_children_total,
          sterilization_date, sterilization_hospital, status, pdf_file_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      empname,
      son_or_wife_of,
      spouse_details,
      date_of_birth,
      date_of_appointment,
      bill_unit_number,
      community,
      designation,
      office,
      department_division,
      pf_number,
      pay_in_pay_band,
      running_allowance,
      grade_pay_substantive,
      grade_pay_officiating_macp,
      number_of_living_children_male,
      number_of_living_children_female,
      number_of_living_children_total,
      sterilization_date,
      sterilization_hospital,
      status,
      pdf_file_path,
    ];

    const [result] = await pool.execute(query, values, (err, res) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Error inserting into database" });
      }
    }); // use pool.execute() for promise-based query execution
    const empId = result.insertId;
    console.log("empid: ", empId);

    if (empId && familyComposition) {
      let parsedFamilyComposition = [];
      try {
        parsedFamilyComposition = JSON.parse(familyComposition); // Safe JSON parse
      } catch (parseError) {
        console.error("Error parsing familyComposition: ", parseError);
        return res.status(400).json({
          message: "Invalid familyComposition data",
          success: false,
        });
      }

      if (parsedFamilyComposition?.length > 0) {
        //console.log("familyComposition: ", parsedFamilyComposition);

        // Loop over familyComposition and insert each record into the FamilyComposition table
        for (let i = 0; i < parsedFamilyComposition.length; i++) {
          const { dependent_name, relationship, age_dob, remarks } =
            parsedFamilyComposition[i];

          // Convert age_dob to a valid date format
          let formatted_age_dob = new Date(age_dob);
          // if (isNaN(formatted_age_dob.getTime())) {
          //   console.error("Invalid date format for age_dob: ", age_dob);
          //   continue; // Skip this entry if the date is invalid
          // }

          const familyCompositionQuery = `
            INSERT INTO FamilyComposition (dependent_name, relationship, age_dob, remarks, emp_id)
            VALUES (?, ?, ?, ?, ?)
          `;
          await pool.execute(familyCompositionQuery, [
            dependent_name,
            relationship,
            formatted_age_dob,
            remarks,
            empId,
          ]);
        }
      }
    }

    return res.status(201).json({
      message: "Family Details Inserted Successfully",
      success: true,
      emp_id: empId,
    });
  } catch (error) {
    console.log("Error Occurred in familyDetails", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const pdfFilePath = req.file
      ? `/uploads/familyDetails/${req.file.filename}`
      : null;
    const updatedData = { ...req.body, pdf_file_path: pdfFilePath };
    await FamilyDetails.update(id, updatedData);

    res.json({
      message: "Family Details record updated successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await FamilyDetails.delete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
