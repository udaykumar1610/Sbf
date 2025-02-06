const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUmidOrEmail } = require("../models/userModel");
require("dotenv").config();

/**
 * User Registration
 */
exports.register = async (req, res) => {
  try {
    const { umid, email, password, confirmPassword, role } = req.body;

    if (
      !password ||
      !confirmPassword ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return res.status(400).json({ message: "Invalid password input" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await findUserByUmidOrEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(umid, email, hashedPassword, role || "user");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * User Login (using UMID or Email)
 */
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or umid

    const user = await findUserByUmidOrEmail(identifier);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role, umid: user.umid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
