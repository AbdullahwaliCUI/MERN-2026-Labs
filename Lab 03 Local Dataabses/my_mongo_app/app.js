require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.use(express.static("public")); // serve HTML

app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
