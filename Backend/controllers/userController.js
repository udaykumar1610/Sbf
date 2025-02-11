const {
  findUserById,
  updateUser,
  findUserByHrmsId,
} = require("../models/userModel");

const getUser = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    console.log("hello");
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const update_User = async (req, res) => {
  try {
    await updateUser(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

  // Controller method to get user by HRMS ID
};

// const getUserByHrmsId = async (req, res) => {
//   const { hrms_id } = req.params; // Get HRMS ID from URL params

//   try {
//     // Fetch user from the model
//     const user = await findUserByHrmsId(hrms_id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(user); // Return the user data as a response
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" }); // Handle any errors
//   }
// };

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

module.exports = {
  getUserByHrmsId,
  update_User,
  getUser,
};
