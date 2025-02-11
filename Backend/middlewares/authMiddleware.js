// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const protect = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   console.log("Received Token:", token); // Debugging
//   console.log("JWT_SECRET from .env:", process.env.JWT_SECRET); // Debugging

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Debugging

//     req.user = decoded; // Attach user info to request
//     next();
//   } catch (err) {
//     console.error("Token Verification Error:", err.message); // Debugging
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };
