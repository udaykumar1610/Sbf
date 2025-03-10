// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;

const express = require("express");
const {
  register,
  login,
  updatePassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updatePassword", updatePassword);

module.exports = router;
