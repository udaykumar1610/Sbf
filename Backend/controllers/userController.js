const {
  findUserById,
  updateUser,
  getUserById,
  findUserByHrmsId,
  deleteFamilyDetail,
} = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    console.log("hello");
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// const update_User = async (req, res) => {
//   try {
//     await updateUser(req.params.id, req.body);
//     res.json({ message: "User updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }

//   // Controller method to get user by HRMS ID
// };

const update_User = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      email,
      // password,
      // confirmPassword,
      designation,
      mobilenumber,
      division,
      office,
      level,
      payband,
      running_allowance,
      familyData,
    } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "User ID is required" });
    }

    // if (!password || !confirmPassword || password !== confirmPassword) {
    //   return res
    //     .status(400)
    //     .json({ status: "error", message: "Passwords do not match" });
    // }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const result = await updateUser(id, {
      email,
      // password: hashedPassword,
      designation,
      mobilenumber,
      division,
      office,
      level,
      payband,
      running_allowance,
      familyData,
    });

    if (result.success) {
      res
        .status(200)
        .json({ status: "success", message: "User updated successfully" });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Failed to update user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

const getUserByHrmsId = async (req, res) => {
  const { hrms_id } = req.params; // Get HRMS ID from URL params

  try {
    // Fetch user from the model using case-insensitive query
    // console.log("Fetching user with HRMS ID:", hrms_id); // Debugging line
    const user = await findUserByHrmsId(hrms_id);

    if (!user) {
      console.log("User not found with HRMS ID:", hrms_id); // Debugging line
      console.log("world");
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); // Return the user data as a response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" }); // Handle any errors
  }
};
const getUserId = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "User ID is required" });
    }

    const result = await getUserById(id);

    if (result.success) {
      res.status(200).json({ status: "success", data: result.user });
    } else {
      res.status(404).json({ status: "error", message: result.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

const deleteFamilyData = async (req, res) => {
  try {
    await deleteFamilyDetail(req.params.id);
    res.json({ status: "success", message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};
module.exports = {
  getUserByHrmsId,
  update_User,
  getUser,
  deleteFamilyData,
  getUserId,
  deleteFamilyData,
};
