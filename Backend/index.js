// index.js
require("dotenv").config(); // 🔑 MUST be at top
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./routes/auth");
const uploadRoute = require("./uploadRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Static folder to serve images
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/upload", uploadRoute);
app.use("/api/auth", auth);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));