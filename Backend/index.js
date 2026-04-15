// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth=require("./routes/auth");
const uploadRoute = require("./uploadRoute");

const app = express();
app.use(cors());
app.use(express.json());

// Static folder to serve images
app.use("/uploads", express.static("uploads"));
// MongoDB connection
mongoose
  .connect("mongodb+srv://faiz:faizjarvis@cluster1.lmtoo7r.mongodb.net/DemoImage?retryWrites=true&w=majority&appName=Cluster1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/upload", uploadRoute);
app.use("/api/auth",auth);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
