const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByHrmsId } = require("../models/userModel");
require("dotenv").config();

/**
 * User Registration
 */
// exports.register = async (req, res) => {
//   console.log("reg:", req.body);
//   try {
//     const {
//       empname,
//       email,
//       password,
//       confirmPassword,
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
//       formData,
//     } = req.body;

//     if (!password || !confirmPassword || password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await findUserByHrmsId(hrms_id);
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await createUser({
//       empname,
//       email,
//       password: hashedPassword,
//       designation,
//       date_of_birth,
//       date_of_appointment,
//       mobilenumber,
//       pf_no,
//       hrms_id,
//       division,
//       office,
//       level,
//       role: role || "user",
//       payband,
//       employeetype,
//       running_allowance,
//       formData,
//     });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

exports.register = async (req, res) => {
  //console.log("req.body:", req.body);

  try {
    const {
      empname,
      email,
      password,
      confirmPassword,
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
    } = req.body;

    if (!password || !confirmPassword || password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await findUserByHrmsId(hrms_id);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse the formData (if it's a stringified JSON)
    // let parsedFamilyData = [];
    // if (formData) {
    //   try {
    //     parsedFamilyData = JSON.parse(formData);
    //   } catch (error) {
    //     console.log("Error parsing formData:", error);
    //   }
    // }

    // Call the createUser function, passing the formData after parsing
    await createUser({
      empname,
      email,
      password: hashedPassword,
      designation,
      date_of_birth,
      date_of_appointment,
      mobilenumber,
      pf_no,
      hrms_id,
      division,
      office,
      level,
      role: role || "user",
      payband,
      employeetype,
      running_allowance,
      familyData,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * User Login (using HRMS ID and Password)
 */
exports.login = async (req, res) => {
  try {
    const { hrms_id, password } = req.body;

    const user = await findUserByHrmsId(hrms_id);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: user.role,
      hrms_id: user.hrms_id,
      payband: user.payband,
      empname: user.empname,
      message: "User login successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
