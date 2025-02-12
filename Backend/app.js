const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const dentureRoutes = require("./routes/dentureRoutes");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/scholar", scholarshipRoutes);

app.use("/api/uploads/scholarships", scholarshipRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/dentures", dentureRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
