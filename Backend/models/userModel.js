const pool = require("../config/db");

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

const updateUser = async (id, userData) => {
  try {
    const {
      email,
      // password,
      designation,
      mobilenumber,
      division,
      office,
      level,
      payband,
      running_allowance,
      familyData,
    } = userData;

    // Update user details in `users` table
    const [updateResult] = await pool.query(
      `UPDATE users 
       SET email = ?, designation = ?, mobilenumber = ?, 
           division = ?, office = ?, level = ?, payband = ?, running_allowance = ? 
       WHERE id = ?`,
      [
        email,
        // password, // Ensure this is hashed if updated
        designation,
        mobilenumber,
        division,
        office,
        level,
        payband,
        running_allowance,
        id,
      ]
    );

    if (familyData && Array.isArray(familyData) && familyData.length > 0) {
      // Delete existing family details before inserting new ones
      await pool.query("DELETE FROM familyData WHERE id = ?", [id]);

      // Insert updated family data
      for (const member of familyData) {
        const { dependent_name, relationship, age_dob, remarks } = member;

        // Convert age_dob to MySQL date format
        const formatted_age_dob = new Date(age_dob).toISOString().split("T")[0];

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

    return {
      message: "User and Family Details Updated Successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error Occurred in updateUser:", error);
    return { message: "Internal Server Error", success: false };
  }
};

// Check if user exists and update password if present
const updateUserPassword = async (hrms_id, mobilenumber, hashedPassword) => {
  try {
    // Check if the user exists
    const [user] = await pool.query(
      "SELECT id FROM users WHERE hrms_id = ? AND mobilenumber = ?",
      [hrms_id, mobilenumber]
    );

    if (user.length === 0) {
      // return { success: false, message: "User not found or details incorrect" };
      throw new Error("User not found or details incorrect");
    }

    // Update password if user exists
    const [result] = await pool.query(
      "UPDATE users SET password = ? WHERE hrms_id = ? AND mobilenumber = ?",
      [hashedPassword, hrms_id, mobilenumber]
    );

    return result.affectedRows > 0
      ? { success: true, message: "Password updated successfully" }
      : { success: false, message: "Password update failed" };
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    // Fetch user details
    const [userRows] = await pool.execute(
      `SELECT *
       FROM users 
       WHERE id = ?`,
      [id]
    );

    if (userRows.length === 0) {
      return { success: false, message: "User not found" };
    }

    const user = userRows[0];

    // Fetch family details for the user
    const [familyRows] = await pool.execute(
      `SELECT deatils_id,dependent_name, relationship, age_dob, remarks ,id
       FROM familyData 
       WHERE id = ?`,
      [id]
    );

    // Convert age_dob to YYYY-MM-DD format
    const formattedFamilyData = familyRows.map((member) => ({
      deatils_id: member.deatils_id,
      dependent_name: member.dependent_name,
      relationship: member.relationship,
      age_dob: new Date(member.age_dob).toISOString().split("T")[0],
      remarks: member.remarks,
      id: member.id,
    }));

    return {
      success: true,
      user: { ...user, familyData: formattedFamilyData },
    };
  } catch (error) {
    console.error("Error occurred in getUserById:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

const deleteFamilyDetail = async (id) => {
  console.log("del id", id);
  await pool.query("DELETE FROM familyData WHERE deatils_id = ?", [id]);
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
  deleteFamilyDetail,
  getUserById,
  updateUserPassword,
};
