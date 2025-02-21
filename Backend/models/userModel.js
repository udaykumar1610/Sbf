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
//     payband,
//     employeetype,
//     running_allowance,
//   } = userData;

//   const [result] = await pool.query(
//     "INSERT INTO users (empname, email, password, designation, date_of_birth, date_of_appointment, mobilenumber, pf_no, hrms_id, division, office, level, role, payband,  employeetype,running_allowance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)", // Added payband in query
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
//       payband,
//       employeetype,
//       running_allowance,
//     ]
//   );

//   return result;
// };

// // Fetch user by HRMS ID
// // const findUserByHrmsId = async (hrms_id) => {
// //   const [rows] = await pool.query("SELECT * FROM users WHERE hrms_id = ?", [
// //     hrms_id,
// //   ]);
// //   return rows[0];
// // };

// // Modified findUserByHrmsId for case-insensitive query
// const findUserByHrmsId = async (hrms_id) => {
//   // console.log("Fetching user with HRMS ID:", hrms_id);
//   const [rows] = await pool.query(
//     "SELECT * FROM users WHERE LOWER(hrms_id) = LOWER(?)",
//     [hrms_id]
//   );
//   // console.log("Database query result:", rows);
//   return rows[0]; // Return the first matching user, or undefined if no user is found
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
//   const [rows] = await pool.query("SELECT * FROM users WHERE id = ? ", [id]);
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
//     payband,
//     employeetype,
//     running_allowance,
//   } = userData;

//   await pool.query(
//     "UPDATE users SET empname=?, email=?, designation=?, date_of_birth=?, date_of_appointment=?, mobilenumber=?, pf_no=?, hrms_id=?, division=?, office=?, level=?, payband=?,  employeetype=?,running_allowance=? WHERE id=?", // Included payband in query
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
//       payband,
//       employeetype,
//       running_allowance,
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
//   findUserByHrmsId,
// };

const pool = require("../config/db");

// Create a new user
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
//     payband,
//     employeetype,
//     running_allowance,
//     familyData
//   } = userData;

//   const [query] = await pool.query(
//     "INSERT INTO users (empname, email, password, designation, date_of_birth, date_of_appointment, mobilenumber, pf_no, hrms_id, division, office, level, role, payband,  employeetype,running_allowance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)", // Added payband in query
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
//       payband,
//       employeetype,
//       running_allowance,
//     ]
//   );

//   const [result] = await pool.execute(query, values, (err, res) => {
//     if (err) {
//       console.log(err);
//       return res
//         .status(500)
//         .json({ message: "Error inserting into database" });
//     }
//   }); // use pool.execute() for promise-based query execution
//   const id = result.insertId;
//   console.log("empid: ", id);

//   if (id && familyData) {
//     let parsedFamilyComposition = [];
//     try {
//       parsedFamilyData= JSON.parse(familyData); // Safe JSON parse
//     } catch (parseError) {
//       console.error("Error parsing familyComposition: ", parseError);
//       return res.status(400).json({
//         message: "Invalid familyComposition data",
//         success: false,
//       });
//     }

//     if (parsedFamilyData?.length > 0) {
//       //console.log("familyComposition: ", parsedFamilyComposition);

//       // Loop over familyComposition and insert each record into the FamilyComposition table
//       for (let i = 0; i < parsedFamilyComposition.length; i++) {
//         const { dependent_name, relationship, age_dob, remarks } =
//           parsedFamilyComposition[i];

//         // Convert age_dob to a valid date format
//         let formatted_age_dob = new Date(age_dob);
//         // if (isNaN(formatted_age_dob.getTime())) {
//         //   console.error("Invalid date format for age_dob: ", age_dob);
//         //   continue; // Skip this entry if the date is invalid
//         // }

//         const familyDataQuery = `
//           INSERT INTO familyData (dependent_name, relationship, age_dob, remarks, id)
//           VALUES (?, ?, ?, ?, ?)
//         `;
//         await pool.execute(familyDataQuery, [
//           dependent_name,
//           relationship,
//           formatted_age_dob,
//           remarks,
//           id,
//         ]);
//       }
//     }
//   }

//   return res.status(201).json({
//     message: "Family Details Inserted Successfully",
//     success: true,
//     emp_id: empId,
//   });
// } catch (error) {
//   console.log("Error Occurred in familyDetails", error);
//   return res
//     .status(500)
//     .json({ message: "Internal Server Error", success: false });
// }

// const createUser = async (userData) => {
//   try {
//     const {
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
//       payband,
//       employeetype,
//       running_allowance,
//       familyData,
//     } = userData;

//     // Insert user data into users table
//     const [result] = await pool.query(
//       "INSERT INTO users (empname, email, password, designation, date_of_birth, date_of_appointment, mobilenumber, pf_no, hrms_id, division, office, level, role, payband, employeetype, running_allowance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//       [
//         empname,
//         email,
//         password,
//         designation,
//         date_of_birth,
//         date_of_appointment,
//         mobilenumber,
//         pf_no,
//         hrms_id,
//         division,
//         office,
//         level,
//         role,
//         payband,
//         employeetype,
//         running_allowance,
//       ]
//     );

//     const id = result.insertId;
//     console.log("id: ", id);

//     if (id && familyData) {
//       let parsedFamilyData = [];
//       try {
//         parsedFamilyData = JSON.parse(familyData); // Safe JSON parse
//       } catch (parseError) {
//         console.error("Error parsing familyData: ", parseError);
//         return {
//           message: "Invalid familyData format",
//           success: false,
//         };
//       }

//       if (Array.isArray(parsedFamilyData) && parsedFamilyData.length > 0) {
//         // Insert each family member into familyData table
//         for (const member of parsedFamilyData) {
//           const { dependent_name, relationship, age_dob, remarks } = member;

//           // Convert age_dob to MySQL date format
//           const formatted_age_dob = new Date(age_dob)
//             .toISOString()
//             .split("T")[0];

//           const familyDataQuery = `
//             INSERT INTO familyData (dependent_name, relationship, age_dob, remarks, user_id)
//             VALUES (?, ?, ?, ?, ?)
//           `;
//           await pool.query(familyDataQuery, [
//             dependent_name,
//             relationship,
//             formatted_age_dob,
//             remarks,
//             id,
//           ]);
//         }
//       }
//     }

//     return {
//       message: "User and Family Details Inserted Successfully",
//       success: true,
//       id: id,
//     };
//   } catch (error) {
//     console.error("Error Occurred in createUser:", error);
//     return {
//       message: "Internal Server Error",
//       success: false,
//     };
//   }
// };

const createUser = async (userData) => {
  try {
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
      payband,
      employeetype,
      running_allowance,
      familyData,
    } = userData;
    //  console.log("model user data :", userData);

    // Insert user data into users table
    const [result] = await pool.query(
      "INSERT INTO users (empname, email, password, designation, date_of_birth, date_of_appointment, mobilenumber, pf_no, hrms_id, division, office, level, role, payband, employeetype, running_allowance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        payband,
        employeetype,
        running_allowance,
      ]
    );

    const id = result.insertId;
    console.log("id: ", id);

    if (id && familyData) {
      if (Array.isArray(familyData) && familyData.length > 0) {
        // Insert each family member into familyData table
        for (const member of familyData) {
          const { dependent_name, relationship, age_dob, remarks } = member;

          // Convert age_dob to MySQL date format
          const formatted_age_dob = new Date(age_dob)
            .toISOString()
            .split("T")[0];

          const familyDataQuery = `
            INSERT INTO familyData (dependent_name, relationship, age_dob, remarks, id)
            VALUES (?, ?, ?, ?, ?)
          `;
          await pool.query(familyDataQuery, [
            dependent_name,
            relationship,
            formatted_age_dob,
            remarks,
            id,
          ]);
        }
      }
    }

    return {
      message: "User and Family Details Inserted Successfully",
      success: true,
      id: id,
    };
  } catch (error) {
    console.error("Error Occurred in createUser:", error);
    return {
      message: "Internal Server Error",
      success: false,
    };
  }
};

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
// const findUserById = async (id) => {
//   const [rows] = await pool.query("SELECT * FROM users WHERE id = ? ", [id]);
//   return rows[0];
// };
const findUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT u.*, fd.dependent_name, fd.relationship, fd.age_dob, fd.remarks FROM familyDetails u LEFT JOIN FamilyComposition fd ON u.id = fd.idWHERE u.id = ?; ",
    [id]
  );
  return rows[0];
};

// Get all users (for admin)
// const getAllUsers = async () => {
//   const [rows] = await pool.query("SELECT * FROM users");
//   return rows;
// };

const getAllUsers = async () => {
  const [rows] = await pool.query(`
    SELECT u.*, fd.dependent_name, fd.relationship, fd.age_dob, fd.remarks
    FROM users u
    LEFT JOIN familyData fd ON u.id = fd.id;
  `);
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
    payband,
    employeetype,
    running_allowance,
  } = userData;

  await pool.query(
    "UPDATE users SET empname=?, email=?, designation=?, date_of_birth=?, date_of_appointment=?, mobilenumber=?, pf_no=?, hrms_id=?, division=?, office=?, level=?, payband=?,  employeetype=?,running_allowance=? WHERE id=?", // Included payband in query
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
      payband,
      employeetype,
      running_allowance,
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
