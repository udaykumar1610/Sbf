const { findUserById } = require("../models/userModel");

exports.getUser = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};
