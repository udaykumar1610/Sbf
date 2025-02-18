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
const medicalAssistanceRoutes = require("./routes/medicalAssistanceRoutes");
const spectaclesRoutes = require("./routes/spectaclesRoutes");
const maintenanceGrantRoutes = require("./routes/maintenanceGrantRoutes");
const motorizedTricycleRoutes = require("./routes/motorizedTricycleRoutes");
const physicallyChallengedRoutes = require("./routes/physicallyChallengedRoutes");
const deafMentalyRoutes = require("./routes/deafMentalRoute");
const kithkinRoutes = require("./routes/kithkinRoutes");
const familyDetails = require("./routes/familyDetailsRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/scholar", scholarshipRoutes);

app.use("/api/uploads/scholarships", scholarshipRoutes);
app.use("/api/dentures", dentureRoutes);
app.use("/api/medical", medicalAssistanceRoutes);
app.use("/api/spectacles", spectaclesRoutes);

app.use("/api/maintenance", maintenanceGrantRoutes);

app.use("/api/motorizedtricycle", motorizedTricycleRoutes);
app.use("/api/physicallychallenged", physicallyChallengedRoutes);
app.use("/api/deafmentaly", deafMentalyRoutes);
app.use("/api/kithkin", kithkinRoutes);
app.use("/api/familyDetails", familyDetails);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
